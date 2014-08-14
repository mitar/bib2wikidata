var JWT = Npm.require('jwt-simple');

MediaWikiOAuth = {};

var BASE_URL = 'https://www.mediawiki.org/w';

var urls = {
  requestToken: BASE_URL + '/index.php?title=Special:OAuth/initiate',
  authorize: BASE_URL + '/index.php?title=Special:OAuth/authorize&fullscreen',
  accessToken: BASE_URL + '/index.php?title=Special:OAuth/token',
  authenticate: BASE_URL + '/index.php?title=Special:OAuth/authorize&fullscreen' // TODO: MediaWiki does not support the authenticate flow, so we reuse authorize
};

MediaWikiOAuth.whitelistedFields = ['confirmed_email', 'blocked', 'registered', 'groups', 'rights'];

OAuth.registerService('mediawiki', 1, urls, function(oauthBinding) {
  var identity = oauthBinding.get(BASE_URL + '/index.php', {title: 'Special:OAuth/identify'});
  var identityDecoded = oauthBinding.decode(identity.content, identity.nonce);

  var serviceData = {
    id: identityDecoded.sub,
    username: identityDecoded.username,
    accessToken: OAuth.sealSecret(oauthBinding.accessToken),
    accessTokenSecret: OAuth.sealSecret(oauthBinding.accessTokenSecret)
  };

  // Include helpful fields from MediaWiki
  var fields = _.pick(identityDecoded, MediaWikiOAuth.whitelistedFields);
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {
      profile: {
        name: identityDecoded.username
      }
    }
  };
});

MediaWikiOAuth.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};

OAuth1Binding.prototype.decode = function (content, nonce) {
  var decoded = JWT.decode(content, this._config.secret);

  // Verify the issuer is who we expect
  // TODO: Don't hardcode www.mediawiki.org, but use only BASE_URL, see https://bugzilla.wikimedia.org/show_bug.cgi?id=69289
  if (decoded.iss !== BASE_URL && decoded.iss !== 'http://www.mediawiki.org') {
    throw new Error("Invalid Issuer: " + decoded.iss);
  }

  // Verify we are the intended audience
  if (decoded.aud !== this._config.consumerKey) {
    throw new Error("Invalid Audience: " + decoded.aud);
  }

  // Verify we are within the time limits of the token. Issued at (iat) should be
  // in the past, Expiration (exp) should be in the future.
  var now = new Date().value / 1000;
  if (decoded.iat > now || decoded.exp < now) {
    throw new Error("Invalid Time: " + decoded.iat);
  }

  // Verify it has the right nonce, otherwise we could have a replay attack
  if (decoded.nonce !== nonce) {
    throw new Error("Invalid Nonce");
  }

  return decoded;
};
