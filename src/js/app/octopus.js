window.App = (function(app){

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


    app.OctopusIndexRoute = Ember.Route.extend({
        model: function() {
            return this.store.find('octopusTenant');
        }
    });

    app.OctopusIndexController = Ember.ArrayController.extend({
    });

    app.OctopusNewRoute = Ember.Route.extend({
        model: function() {
             return this.store.createRecord('octopusTenant');
        },
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
        isNew: true,
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
        isEdit: true,
        isNew: false
    });

    return app;
})(App);
