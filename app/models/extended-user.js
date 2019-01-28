import DS from 'ember-data';

export default DS.Model.extend({
  realm: DS.attr('string', { defaultValue: 'user' }),
  role: DS.attr('string', { defaultValue: 'student' }),
  email: DS.attr('string'),
  username: DS.attr('string'),
  password: DS.attr('string'),
  memberships: DS.hasMany('membership'),
});
