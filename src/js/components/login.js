var LoginApp = (function(app) {
  var loginApp = Ember.Application.create(
    {
      rootElement: "#login"
    }
  );


  loginApp.ApplicationRoute = Ember.Route.extend({
    setupController: function(controller) {
      // `controller` is the instance of ApplicationController
      controller.set('model', LoginService);
    }
  });


  loginApp.ApplicationView = Ember.View.extend({
    templateName: 'loginAppView'
  });


  loginApp.Router.map(function() {
    this.route("joker", { path: '/:slug' });
  });

    loginApp.Store = DS.Store.extend({
      adapter: DS.FixtureAdapter
    });

  return loginApp;
})(window.App);
