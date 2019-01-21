import * as React from 'react';
import { mount } from 'enzyme';
import { MenuItem } from '../components/radarMenu/MenuItem';
import { ringNames } from '../models/Rings';

describe('When I click on the chevron icon', () => {
  it('should open the menu', () => {
    const wrapper = mount(
      <MenuItem ring={ringNames[0]} technologies={[]} dispatch={jest.fn()} />
    );

    wrapper
      .find(MenuItem)
      .find('.chevron')
      .first()
      .simulate('click')
      .update();

    expect(wrapper.find('li').hasClass('-open')).toBe(true);
  });
});
