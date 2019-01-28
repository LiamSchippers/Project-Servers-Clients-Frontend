import isAuthenticatedMixin from '../mixins/authentication-route-mixin';
import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend(isAuthenticatedMixin, {
  session:  inject('session'),
  model() {
    return RSVP.hash({
      reservations: this.store.findAll('reservation'),
      memberships: this.store.query('ExtendedUser', {
          filter: {
            where: {
              username: this.get('session.data.currentUser').username,
              email: this.get('session.data.currentUser').email
            }
          }})
        .then(function(users){
          return users.firstObject.memberships;
        })
    });
  }
});
