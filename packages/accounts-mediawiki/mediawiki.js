Accounts.oauth.registerService('mediawiki');

if (Meteor.isClient) {
  Meteor.loginWithMediawiki = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    MediaWikiOAuth.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  var autopublishedFields = _.map(
    MediaWikiOAuth.whitelistedFields.concat(['id', 'username']),
    function (subfield) { return 'services.mediawiki.' + subfield; });

  Accounts.addAutopublishFields({
    forLoggedInUser: autopublishedFields,
    forOtherUsers: autopublishedFields
  });
}
