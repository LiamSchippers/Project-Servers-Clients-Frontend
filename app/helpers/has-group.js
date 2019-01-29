import Helper from '@ember/component/helper';
import {inject as service} from '@ember/service';
import {computed} from '@ember/object';

export default Helper.extend({
  session: service(),
  compute() {
    let session = this.session;
    if (session.get('data.role') === "admin" || session.get('data.role') === "teacher" || session.get('data.hasGroup') ) return true;
    return this.memberships;
  }
});
