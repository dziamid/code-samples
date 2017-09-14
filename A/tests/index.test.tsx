/**
 * Testing our link component
 */
import * as React from 'react';
import A from '../index';
import {mount} from 'enzyme';
import {default as context} from 'tests/context/all';
const toJson = require('enzyme-to-json').default;

describe('<A />', () => {
  it('should render correctly', () => {
    const children = (<h1>Test</h1>);
    const wrapper = mount(context(
      <A href="/link">
        {children}
      </A>
    ));

    expect(toJson(wrapper.find('A'))).toMatchSnapshot();
  });

});
