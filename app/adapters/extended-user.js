import JSONAPIAdapter from './application';
import DS from 'ember-data';
import { underscore } from '@ember/string';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{
  authorizer: 'authorizer:application',
  host: 'http://localhost:3000',
  namespace: 'api',
});
