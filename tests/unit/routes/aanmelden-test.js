import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | aanmelden', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:aanmelden');
    assert.ok(route);
  });
});
