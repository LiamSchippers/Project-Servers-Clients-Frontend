App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.IncrementForComponent = Ember.Component.extend({
  numOfTimes: function(){
    var times = this.get('times');
    return new Array(parseInt(times));
  }.property('times')
});
