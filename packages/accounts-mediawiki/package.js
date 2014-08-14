Package.describe({
  summary: "Login service for MediaWiki accounts"
});

Package.on_use(function(api) {
  api.use('underscore', ['server']);
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('oauth', ['client']);
  api.use('mediawiki-oauth', ['client', 'server']);

  api.use('http', ['client', 'server']);

  api.add_files('mediawiki_login_button.css', 'client');

  api.add_files("mediawiki.js");
});
