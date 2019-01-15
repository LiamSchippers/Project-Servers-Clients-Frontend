import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('extended-user'),
  studentgroup: DS.belongsTo('studentgroup')
});
