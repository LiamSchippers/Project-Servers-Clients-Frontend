import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | classrooms/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:classrooms/new');
    assert.ok(route);
    assert.true(false); // failing test for testing purposes
  });
});
