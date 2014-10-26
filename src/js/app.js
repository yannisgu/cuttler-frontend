window.App = (function(){
  var app = Ember.Application.create(
    {
      rootElement: "#application"
    }
  );

  app.ApplicationView = Ember.View.extend({
    templateName: 'login'
  });

  return app;
})();
