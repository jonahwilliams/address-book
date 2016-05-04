jest.unmock('../Button');
jest.unmock('../IfElse');
jest.unmock('react');
jest.unmock('react-addons-test-utils');

import Button from '../Button';
import IfElse from '../IfElse';
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

describe('Button', () => {
  it('...has a test', () => {
    const button = TestUtils.renderIntoDocument(
      <FCMock
        Component={Button}
        handleClick={() => undefined}>
        {"Hello"}
      </FCMock>);
    TestUtils.findRenderedDOMComponentWithTag(button, 'div');
    expect(true).toBe(true);
  });
});


describe('IfElse', () => {
  it('renders correctly', () => {
    const ifelse = TestUtils.renderIntoDocument(
      <FCMock
        Component={IfElse}
        predicate={true}>
        <span value="a"></span>
        <span value="b"></span>
      </FCMock>
    );
    const dom = TestUtils.findRenderedDOMComponentWithTag(ifelse, 'span');
    expect(dom.value).toBe("a");

    const ifelse2 = TestUtils.renderIntoDocument(
      <FCMock
        Component={IfElse}
        predicate={false}>
        <span value="a"></span>
        <span value="b"></span>
      </FCMock>
    );
    const dom2 = TestUtils.findRenderedDOMComponentWithTag(ifelse2, 'span');
    expect(dom2.value).toBe("b");
  });
});
