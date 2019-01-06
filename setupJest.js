import { config } from '@vue/test-utils'; // eslint-disable-line import/no-extraneous-dependencies

require('dotenv').config({ path: '.env.test' });

config.stubs['x-btn'] = '<button @click="$emit(\'click\')"/>';
config.stubs['x-text'] = '<p />';
config.stubs['x-spacer'] = '<span />';
