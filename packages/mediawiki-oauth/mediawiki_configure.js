Template.configureLoginServiceDialogForMediawiki.siteUrl = function () {
  return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForMediawiki.fields = function () {
  return [
    {property: 'consumerKey', label: 'Consumer token'},
    {property: 'secret', label: 'Secret token'}
  ];
};
