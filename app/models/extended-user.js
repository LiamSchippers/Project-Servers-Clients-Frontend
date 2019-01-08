import DS from 'ember-data';

export default DS.Model.extend({
  // userId: DS.attr('string'),
  realm: DS.attr('string'),
  username: DS.attr('string'),
  email: DS.attr('string')
});
