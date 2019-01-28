import DS from 'ember-data';

export default DS.Model.extend({
  roomNumber: DS.attr('string'),
  building: DS.attr('string', { defaultValue: 'Epy Drost' }),
  mainClassroomType: DS.attr('string', { defaultValue: 'Onderwijsruimte' }),
  kind: DS.attr('string', { defaultValue: 'Onderwijsruimte' }),
  type: DS.attr('string', { defaultValue: 'apple' }),
  capacity: DS.attr('number'),
  reservations: DS.hasMany('reservation'),
  availableSpots: DS.attr('number'),
});
