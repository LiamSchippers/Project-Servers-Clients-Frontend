import DS from 'ember-data';

export default DS.Model.extend({
  roomNumber: DS.attr('string'),
  building: DS.attr('string', { defaultValue: 'Epy Drost' }),
  mainClassroomType: DS.attr('string', { defaultValue: 'Onderwijsruimte' }), // hoofdtype
  kind: DS.attr('string', { defaultValue: 'Specifiek' }), // subtype
  type: DS.attr('string', { defaultValue: 'apple' }), // faciliteiten
  capacity: DS.attr('number', { defaultValue: 25 }),
  reservations: DS.hasMany('reservation'),
  availableSpots: DS.attr('number'),
});
