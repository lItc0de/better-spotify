import { config } from '@vue/test-utils'; // eslint-disable-line import/no-extraneous-dependencies

require('dotenv').config({ path: '.env.test' });

config.stubs['x-btn'] = '<button @click="$emit(\'click\')"/>';
config.stubs['x-text'] = '<p />';
config.stubs['x-spacer'] = '<span />';
config.stubs['x-navigation-drawer'] = '<div />';
config.stubs['x-navigation-list'] = '<ul />';
config.stubs['x-navigation-list-item'] = '<li />';
config.stubs['x-grid-list'] = '<div />';
config.stubs['x-app'] = '<div><slot /></div>';
config.stubs['x-layout'] = '<div/>';
config.stubs['x-container'] = '<div/>';
