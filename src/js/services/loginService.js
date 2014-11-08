window.LoginService = (function()  {
  var loginService = Ember.Object.extend({
    isLoggedIn: false,
    login: function(username, password) {
      var _this = this;
      return new Ember.RSVP.Promise(function(resolve, reject) {
          if(username == "demo" && password == "demo") {
              _this.set("isLoggedIn", true)
              Ember.run(null, resolve);
          }
          else {
              Ember.run(null, reject);
          }
      });
    },
    register : function(user) {
        console.log(user);
        var _this = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.run(null, resolve);
      });
    }
  });
  

  return loginService.create();
}());
