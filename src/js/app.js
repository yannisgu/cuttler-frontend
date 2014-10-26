window.App = (function(){
  var app = Ember.Application.create(
    {
      rootElement: "#application"
    }
  );

  app.LoginView = Ember.View.extend({
    templateName: 'login'
  });

  return app;
})();
