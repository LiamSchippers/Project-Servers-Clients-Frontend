import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('classrooms', function() {
    this.route('new');
    this.route('show', {path: '/:classroom_id'});
  });

  this.route('studentgroups', function() {
    this.route('new');
    this.route('show', {path: '/:group_id'});
    this.route('edit', {path: '/edit/:group_id'});
  });

  this.route('reservations', function() {
    this.route('new');
  });

  this.route('login');
  this.route('admin');
  this.route('registrate');
  this.route('user-profile', { path: '/profile'});
});

export default Router;
