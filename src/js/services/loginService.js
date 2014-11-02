window.LoginService = (function()  {
  var loginService = Ember.Object.extend({
    isLoggedIn: false,
    login: function(username, password) {
      console.log(username);
      console.log(password);
      var _this = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {
          _this.set("isLoggedIn", true)
          Ember.run(null, resolve);
      });
    }
  });

  return loginService.create();
}());
