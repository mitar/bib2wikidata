var Future = Npm.require('fibers/future');

MediaWiki = Npm.require('mediawiki');

function wrap(self, func, args) {
  var future = new Future();
  func.apply(self, args).complete(function (response) {
    future.return(response);
  }).error(function (error) {
    future.throw(error);
  });
  return future.wait();
}

MediaWiki.Bot.prototype.getSync = function () {
  return wrap(this, this.get, arguments);
};

MediaWiki.Bot.prototype.postSync = function () {
  return wrap(this, this.post, arguments);
};

MediaWiki.Bot.prototype.loginSync = function () {
  return wrap(this, this.login, arguments);
};

MediaWiki.Bot.prototype.logoutSync = function () {
  return wrap(this, this.logout, arguments);
};

MediaWiki.Bot.prototype.whoamiSync = function () {
  return wrap(this, this.whoami, arguments);
};

MediaWiki.Bot.prototype.userinfoSync = function () {
  return wrap(this, this.userinfo, arguments);
};
