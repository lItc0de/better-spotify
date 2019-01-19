import { config } from '@vue/test-utils'; // eslint-disable-line import/no-extraneous-dependencies

require('dotenv').config({ path: '.env.test' });

config.stubs = {
  'x-app': '<div><slot /></div>',
  'x-btn': '<button @click="$emit(\'click\')"/>',
  'x-container': '<div class="container"><slot/></div>',
  'x-grid-list': '<div><slot/></div>',
  'x-layout': '<div><slot/></div>',
  'x-navigation-drawer': '<div><slot/></div>',
  'x-navigation-list-item': '<li><slot/></li>',
  'x-navigation-list': '<ul><slot/></ul>',
  'x-spacer': '<span/>',
  'x-text': '<p/>',
};
