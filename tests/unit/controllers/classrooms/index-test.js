import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | classrooms/index', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:classrooms/index');
    assert.ok(controller);
  });
});
