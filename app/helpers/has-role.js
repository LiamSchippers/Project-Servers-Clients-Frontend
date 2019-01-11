import Helper from '@ember/component/helper';
import {inject as service} from '@ember/service';

export default Helper.extend({
  session: service(),

  compute([role, ...rest], hash) {
    let session = this.session;
    let userId = session.data.authenticated.userId;

    $.get("http://localhost:3000/api/extended_users/" + userId + "/role")
      .then(function (response) {
        $.get(response.data.links.self)
          .then(function (response) {
            role = response.data.attributes.name;
            console.log(role);
          });
      });

    console.log(role);

    if (role === "admin") {
      return true;
    } else if (role === "teacher") {
      return true;
    } else {
      return false;
    }
  }
});
