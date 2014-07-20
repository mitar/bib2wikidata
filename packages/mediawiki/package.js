Package.describe({
  summary: "Mediawiki plugin"
});

Npm.depends({
  mediawiki: '0.0.14'
});

Package.on_use(function (api) {
  api.export('MediaWiki');

  api.add_files([
    'server.js'
  ], 'server');
});
