import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('classrooms', function() {
    this.route('new');
  });

  this.route('studentgroups', function() {
    this.route('new');
  });

  this.route('classroom', function() {});
  this.route('login');
  this.route('studentgroup', function() {});
  this.route('reservations', function() {});
});

export default Router;
