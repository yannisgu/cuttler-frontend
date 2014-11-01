window.App = (function(){
  var app = Ember.Application.create(
    {
      rootElement: "#application"
    }
  );

  app.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
      this.transitionTo('login');
    }
  });

  app.Router.map(function() {
    this.route("login");
    this.route("register");
  });


  return app;
})();
