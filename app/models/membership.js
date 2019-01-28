import DS from 'ember-data';

export default DS.Model.extend({
  studentgroup: DS.belongsTo("studentgroup"),
  user: DS.belongsTo("extended-user"),
});
