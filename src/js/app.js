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
    this.route("register", {path: "/register"});
    this.route("registerWelcome", {path: "/register/welcome"});
    this.route("octopusTenants");
  });

  app.LoginController = Ember.ObjectController.extend({
    username: "",
    password: "",
     actions: {
      login: function() {
        _this = this;
        LoginService.login(this.get('username'), this.get('password')).
        then(function(){
          _this.transitionTo('octopusTenants');
        });
      }
    }
  });

  app.RegisterController = Ember.ObjectController.extend({
    "username": "",
    "password": "",
    "email": "",
    "adress": "",
    "firstname": "",
    "lastname": "",
    "country": "",
    "zip": "",
    "location": "",
    "password-confirm" : "",
     actions: {
      register: function() {
        _this = this;
        var user = {};
        var fields = ["username", "password", "email", "adress", "firstname", "lastname", "country","zip", "location"];
        for(var i = 0; i < fields.length; i++) {
          var field  = fields[i];
          user[field] = _this.get(field);
        }
        LoginService.register(user).
        then(function() {
          _this.transitionTo('registerWelcome');
        });
      }
    }
  });


  return app;
})();
