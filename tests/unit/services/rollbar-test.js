import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupSinonTest from '../../helpers/sinon';
import { get } from '@ember/object';

module('Unit | Service | rollbar', function(hooks) {
  setupTest(hooks);
  setupSinonTest(hooks);

  test('it exists', function(assert) {
    assert.expect(0);

    let service = this.owner.lookup('service:rollbar');
    let mock = this.sinon.mock(get(service, 'instance'));
    let person = {name: 'Joe', email: 'joe@example.com'};

    mock.expects('log');
    mock.expects('debug');
    mock.expects('info');
    mock.expects('warn');
    mock.expects('warning');
    mock.expects('error');
    mock.expects('critical');
    mock.expects('configure').withArgs({payload: {person}});

    service.log('log');
    service.debug('debug');
    service.info('info');
    service.warn('warn');
    service.warning('warning');
    service.error('error');
    service.critical('critical');
    service.setPerson(person);

    mock.verify();
  });
});
