import * as React from 'react';
import { mount } from 'enzyme';
import Select from '../components/select';

describe('when I click on the chevron icon', () => {
  it('should change the transition class', () => {
    const label = 'pick something',
      options = ['foo', 'bar'],
      wrapper = mount(
        <Select
          value=""
          placeholder={label}
          label={label}
          options={options}
          updateValue={jest.fn()}
        />
      );

    expect(wrapper.find('span.-open').exists()).toBe(false);

    wrapper
      .find('.icon.right')
      .first()
      .simulate('click')
      .update();

    expect(wrapper.find('span.-open').exists()).toBe(true);
  });
});
