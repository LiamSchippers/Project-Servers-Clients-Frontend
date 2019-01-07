import { helper } from '@ember/component/helper';

export function hasGroupId(params/*, hash*/) {
  var arg1 = params[0]; // group id
  var arg2 = params[1]; // student with group id

  console.log(arg1);
  console.log(arg2);

  if (arg1.equals(arg2)) {
    return params;
  }




}

export default helper(hasGroupId);
