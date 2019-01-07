import DS from 'ember-data';

export default DS.Model.extend({
  realm: "student",
  email: DS.attr('string'),
  username: DS.attr('string'),
  password: DS.attr('string')
});
