import DS from 'ember-data';

export default DS.Model.extend({
  studentgroupId: DS.attr('string'),
  userId: DS.attr('string'),
  user: DS.belongsTo('extended-user'),
  studentgroup: DS.belongsTo('studentgroup')
});
