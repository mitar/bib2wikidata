Package.describe({
  summary: "MediaWiki OAuth flow"
});

Npm.depends({
  'jwt-simple': '0.2.0'
});

Package.on_use(function(api) {
  api.use('http', ['client', 'server']);
  api.use('templating', 'client');
  api.use('oauth1', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('random', 'client');
  api.use('underscore', 'server');
  api.use('service-configuration', ['client', 'server']);

  api.export('MediaWikiOAuth');

  api.add_files(
    ['mediawiki_configure.html', 'mediawiki_configure.js'],
    'client');

  api.add_files('mediawiki_server.js', 'server');
  api.add_files('mediawiki_client.js', 'client');
});
