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


    app.Router.map(function() {
      this.route("login");
      this.route("register", {path: "/register"});
      this.route("registerWelcome", {path: "/register/welcome"});
      this.resource('octopus', {path: "/octopus"}, function() {
          this.route("edit", {path: "/:id"});
          this.route("new", {path: "/new"});

      });
    });

  app.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
      this.transitionTo('login');
    }
  });

  app.CustomInput = Ember.EasyForm.Input.extend({
      bindableInputOptions: ['placeholder', 'prompt', 'disabled']
  });

  Ember.Handlebars.registerHelper('input', function(property, options) {
      if (arguments.length === 1) {
          return Ember.Handlebars.helpers['ember-input'].call(this, arguments[0]);
      }
      options = Ember.EasyForm.processOptions(property, options);
      options.hash.isBlock = !!(options.fn);
      return Ember.Handlebars.helpers.view.call(this, app.CustomInput, options);
  });



    app.LoginRoute = Ember.Route.extend({
        model: function() {
            return {
              username: "",
              password: ""
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

    app.OctopusIndexRoute = Ember.Route.extend({
      model: function() {
        return this.store.find('octopusTenant');
      }
    });



    app.OctopusTenant = DS.Model.extend({
      name: DS.attr('string'),
      mainUrl :  DS.attr('string')
    });

    app.OctopusTenant.reopenClass({
      FIXTURES: [
        { id: 1, name: 'Dummy ', mainUrl: 'https://dummy.mycuttle.com' },
        { id: 2, name: 'Lorem ', mainUrl: 'https://lorem.mycuttle.com' }
      ]
    });

    app.OctopusIndexController = Ember.ArrayController.extend({
    });

    app.OctopusNewRoute = Ember.Route.extend({
         model: function() {
             return this.store.createRecord('octopusTenant');
         },
         isNew: true,
         isEdit: false,

        renderTemplate: function(controller, model) {
            this.render('octopus/edit', {
                controller: controller
            });
        },
        deactivate: function() {
            var model = this.modelFor('octopus.new');
            if (model && model.get('isDirty') && !model.get('isSaving')) {
                model.rollback();
            }
        }
    });

    app.OctopusNewController = Ember.ObjectController.extend({
        isEdit: false,
        actions: {
            submit: function() {
                this.model.save();
                this.transitionTo('octopus');
            },
        }
    });


        app.OctopusEditRoute = Ember.Route.extend({
            model: function(params) {
                return this.store.find('octopusTenant', params.id);
            }
        });

        app.OctopusEditController = Ember.ObjectController.extend({
            isEdit: true
        });

    app.Store = DS.Store.extend({
      adapter: DS.FixtureAdapter
    });



  return app;
})();
