var LoginApp = (function(app) {
  var loginApp = Ember.Application.create(
    {
      rootElement: "#login"
    }
  );

  loginApp.ApplicationView = Ember.View.extend({
    templateName: 'loginAppView'
  });
  
  return loginApp;
})(window.App);
