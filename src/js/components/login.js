var LoginApp = (function(app) {
  var loginApp = Ember.Application.create(
    {
      rootElement: "#login"
    }
  );

  loginApp.ApplicationView = Ember.View.extend({
    templateName: 'loginAppView'
  });


  loginApp.Router.map(function() {
    this.route("joker", { path: '/:slug' });
  });

  return loginApp;
})(window.App);
