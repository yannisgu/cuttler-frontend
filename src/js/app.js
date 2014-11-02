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
    this.route("octopusTenants");
  });

  app.LoginController = Ember.ObjectController.extend({
    username: "",
    password: "",
     actions: {
      login: function() {
        _this = this
        LoginService.login(this.get('username'), this.get('password')).
        then(function(){
          _this.transitionTo('octopusTenants');
        });
      }
    }
  });


  return app;
})();
