import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject} from '@ember/service';

export default Component.extend({
  store: inject(),
  memberships: computed('id', function () {
    return this.get('store').query('membership', {
      filter: {
        where: {
          "studentgroup-id": this.get('id'),
        }
      }
    })
  })
});
