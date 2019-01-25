import DS from 'ember-data';

export default DS.Model.extend({
  studentgroupId: DS.attr("number"),
  userId: DS.attr("number"),
  studentgroup: DS.belongsTo("studentgroup"),
  extendedUser: DS.belongsTo("extendedUser"),
});
