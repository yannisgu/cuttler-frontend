window.App = (function(){
    var app = Ember.Application.create({
        rootElement: "#application"
    });

    Ember.EasyForm.Config.registerWrapper('cuttle', {
        inputClass: 'row',
        inputTemplate: 'forms/input',
        labelClass: 'label'
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

    app.Store = DS.Store.extend({
        adapter: DS.FixtureAdapter
    });

    return app;
})();
