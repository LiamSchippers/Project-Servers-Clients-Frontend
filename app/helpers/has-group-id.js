import { helper } from '@ember/component/helper';

export function hasGroupId([model], namedArgs) {
  //check if userId exists in model.
  return model.findBy('userId', namedArgs.userId);
  }

export default helper(hasGroupId);
