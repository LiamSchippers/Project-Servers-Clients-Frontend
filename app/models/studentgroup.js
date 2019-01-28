import DS from 'ember-data';
import {computed} from '@ember/object';


export default DS.Model.extend({
  groupName: DS.attr('string'),
  reservableHours: DS.attr('number'),
  reservations: DS.hasMany('reservation'),
  memberships: DS.hasMany('membership'),

  amountOfGroupMembers: computed('membership', function () {
    //amountOfGroupMembers standard set to 0;
    let amount = 0;
    let _this = this;

    return new Promise(function (resolve, reject) {
      //for each membership the studentgroup has, we want to add that up to the amount variable
      _this.memberships.then((memberships) => {
        amount = memberships.length;
      });
      _this.memberships.finally(() =>{
        resolve(amount);
      })
    });
  })
});
