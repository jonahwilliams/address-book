jest.unmock('../Contact');
jest.unmock('../AddContact');
jest.unmock('../ContactGroup');
jest.unmock('../ContactList');
jest.unmock('../EditContact');
jest.unmock('../MainContact');
jest.unmock('react');
jest.unmock('react-addons-test-utils');

import Contact from '../Contact';
import AddContact from '../AddContact';
import ContactGroup from '../ContactGroup';
import ContactList from '../ContactList';
import EditContact from '../EditContact';
import MainContact from '../MainContact';
import React from 'react';
import TestUtils from 'react-addons-test-utils';


describe('Contact', () => {
  it('has a test!', () => {
    expect(true).toBe(true);
  });
});

describe('AddContact', () => {
  it('has a test!', () => {
    expect(true).toBe(true);
  });
});

describe('ContactGroup', () => {
  it('has a test!', () => {
    expect(true).toBe(true);
  });
});

describe('ContactList', () => {
  it('has a test!', () => {
    expect(true).toBe(true);
  });
});

describe('EditContact', () => {
  it('has a test!', () => {
    expect(true).toBe(true);
  });
});

describe('MainContact', () => {

});
