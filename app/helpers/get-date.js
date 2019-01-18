import { helper } from '@ember/component/helper';

export function getDate(/*, hash*/) {

  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();

  var date =  day + "-" + month + "-" + year;

  return date;
}

export default helper(getDate);
