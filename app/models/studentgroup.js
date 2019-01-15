import DS from 'ember-data';

export default DS.Model.extend({
  groupName: DS.attr('string'),
  reservableHours: DS.attr('number'),
  memberships: DS.hasMany('membership')
});
