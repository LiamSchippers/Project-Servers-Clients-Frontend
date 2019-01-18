import Helper from '@ember/component/helper';
import {inject as service} from '@ember/service';

export default Helper.extend({
  session: service(),

  compute([role, ...rest], hash) {
    let session = this.session;

    if (session.get('data.role') === role) {
      return true;
    } else {
      return false;
    }
  }
});