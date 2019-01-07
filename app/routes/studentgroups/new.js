import Route from '@ember/routing/route';
import studentgroup from "../../models/studentgroup";

export default Route.extend({


  //return create record model of studentgroup.
  model() {
    return this.store.createRecord('studentgroup');
  },

  actions: {
    saveModel() {
      this.currentModel.save().then(() => {
        this.transitionTo('studentgroups.show',this.currentModel.id);
      })
    },
    cancelModel() {
      this.currentModel.destroyRecord().then(() => {
        this.transitionTo('studentgroups.index')
      })
    }
  }
});
