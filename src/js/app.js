window.App = (function(){
    Ember.EasyForm.Config.registerWrapper('cuttle', {
        inputClass: 'row',
        inputTemplate: 'forms/input',
        labelClass: 'label'
    });

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
    this.resource('octopus', { path: '/octopus' }, function() {
    });
  });


    app.LoginRoute = Ember.Route.extend({
        model: function() {
            return {
              username: "",
              password: "",
            }
        }
    })
  app.LoginController = Ember.ObjectController.extend({
      loginFailed : false,
      actions: {
          login: function() {
            _this = this;
            LoginService.login(this.model.username, this.model.password).
            then(function(){
              _this.transitionTo('octopus');
          }, function() {
              _this.set("loginFailed", true)
          });
      }
    }
  });

    app.RegisterRoute = Ember.Route.extend({
        model: function() {
            return app.Register.create();
        }
    });

    app.Register = Ember.Object.extend(Ember.Validations.Mixin, {
        "username": "",
        "password": "",
        "email": "",
        "adress": "",
        "firstname": "",
        "lastname": "",
        "country": "",
        "zip": "",
        "location": "",
        "passwordConfirmation" : "",
          validations: {
              username: {
                  presence: true
              },
              password: {
                  presence: true,
                 confirmation: true
                },
              passwordConfirmation: {
                  presence: true
              },
              email: {
                  presence: true
              },
              adress: {
                  presence: true
              },
              firstname: {
                  presence: true
              },
              lastname: {
                  presence: true
              },
              country: {
                  presence: true
              },
              zip: {
                  presence: true
              },
              location: {
                  presence: true
              }
          }
    });

  app.RegisterController = Ember.ObjectController.extend({
     actions: {
      submit: function() {
          var _this = this;
          LoginService.register(this.model)
          .then(function() {
              _this.transitionTo('registerWelcome');
          });
      }
    }
  });

  return app;
})();
