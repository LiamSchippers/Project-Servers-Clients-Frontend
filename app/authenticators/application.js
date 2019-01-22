import Loopback from 'ember-simple-auth-loopback-3/authenticators/loopback';

export default Loopback.extend({
  loginEndpoint: 'http://localhost:3000/api/extended_users/login',
});
