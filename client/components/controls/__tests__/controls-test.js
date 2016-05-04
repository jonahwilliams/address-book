jest.unmock('../Controls');
jest.unmock('react');
jest.unmock('react-addons-test-utils');

import Controls from '../Controls';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

class FCMock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<this.props.Component {...this.props}/>);
  }
}

describe('Controls', () => {
  it('renders into the document correctly', () => {
    const model = {
      group: 'NONE',
      filter: ''
    };
    const controls = TestUtils.renderIntoDocument(
      <FCMock Component={Controls}
        group={model.group}
        filter={model.filter}
        setGroup={(x) => model.group = x}
        setFilter={(x) => model.filter = x}/>
    );
    const inputDom = TestUtils.findRenderedDOMComponentWithTag(controls, 'input');
    expect(inputDom.value).toBe('');

    const selectDom = TestUtils.findRenderedDOMComponentWithTag(controls, 'select');
    expect(selectDom.value).toBe('NONE');

  });
});
