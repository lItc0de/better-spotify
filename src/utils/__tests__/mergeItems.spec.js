import mergeItems from '../mergeItems';

const getItems = () => [
  { id: '1', name: 'test1' },
  { id: '2', name: 'test2' },
  { id: '3', name: 'test3' },
  { id: '4', name: 'test4' },
];

describe('mergeItems', () => {
  it('should append new items to an existing list', () => {
    const existingItems = getItems();
    const newItems = [
      { id: '5', name: 'test4' },
      { id: '6', name: 'test4' },
    ];
    const mergedItems = mergeItems(existingItems, newItems);

    expect(mergedItems).toEqual([...existingItems, ...newItems]);
  });
});
