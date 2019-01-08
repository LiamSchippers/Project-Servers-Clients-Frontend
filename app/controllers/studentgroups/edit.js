import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    filterByStudent(param) {
      if (param !== '') {
        return this.store.query('extended-user', {
          filter: {
            where: {
              username: {ilike: '%'+ param + '%'},
              realm: 'student'
            }
          }
        })
      } else{
        return this.store.query('extended-user', {
          filter: {
            where: {
              realm: 'student'
            }
          }
        })
      }
    }
  }
});
