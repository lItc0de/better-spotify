import clonedeep from 'lodash.clonedeep';
import { shallowMount } from '@vue/test-utils';
import playlist from '@/__mocks__/playlist.json';

import Track from './Track.vue';

describe('Playlists Track', () => {
  let store;
  let wrapper;
  let track;

  beforeEach(() => {
    track = clonedeep(playlist.tracks.items[0].track);
    wrapper = shallowMount(Track, {
      store,
      propsData: {
        track,
      },
    });
  });

  it('shows the wanted information', () => {
    const artwork = wrapper.find('[data-test="track-artwork"]');
    const name = wrapper.find('[data-test="track-name"]');
    const artists = wrapper.find('[data-test="track-artists"]');

    expect(artwork.element.src).toEqual(track.album.images[2].url);
    expect(name.text()).toEqual(track.name);
    expect(artists.text()).toEqual(track.artists[0].name);
  });

  it('emits play on dblclick', () => {
    wrapper.trigger('dblclick');

    expect(wrapper.emitted('play')[0]).toEqual([]);
  });
});
