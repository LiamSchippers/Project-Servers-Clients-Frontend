import DS from 'ember-data';

export default DS.Model.extend({
  studentNumber: DS.attr('number'),
  name: DS.attr('string'),
  password: DS.attr('string')
});
