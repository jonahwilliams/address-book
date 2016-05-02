'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// global React, ReactDOM

/* interface Contact {
 *    firstName: string;
 *    lastName:  string;
 *    birthDay:  string;
 *    birthMonth: string;
 *    birthYear:  string;
 *    email: string;
 *    phone: string;
 * }
 */

/* getContacts GET /contacts
 * @returns{[]Contact}
 */
function getContacts() {
  return fetch('/contacts', { method: 'GET' }).then(function (d) {
    return d.json();
  }).then(function (b) {
    return {
      results: b.results.map(function (d) {
        return {
          firstName: d.first_name,
          lastName: d.last_name,
          birthDay: d.birth_day,
          birthMonth: d.birth_month,
          birthYear: d.birth_year,
          email: d.email,
          phone: d.phone,
          id: d.id
        };
      })
    };
  });
}

/* addContact POST /contacts
 * @param {Object} Contact
 * @returns {Promise<{success: boolean}>}
 */
function addContact(_ref) {
  var firstName = _ref.firstName;
  var lastName = _ref.lastName;
  var birthDay = _ref.birthDay;
  var birthMonth = _ref.birthMonth;
  var birthYear = _ref.birthYear;
  var email = _ref.email;
  var phone = _ref.phone;

  var args = {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      birth_day: birthDay,
      birth_month: birthMonth,
      birth_year: birthYear,
      email: email,
      phone: phone
    })
  };
  return fetch('/contacts', args).then(function (d) {
    return d.json();
  });
}

/* updateContact PUT /contacts/:contact_id
 * @param {Number} id the id of contact to be update
 * @param {Contact} contact the fields to be updated
 * @returns {Promise<{success: boolean}>}
 */
function updateContact(id, contact) {
  var args = {
    method: 'PUT',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      first_name: contact.firstName,
      last_name: contact.lastName,
      birth_day: contact.birthDay,
      birth_month: contact.birthMonth,
      birth_year: contact.birthYear,
      email: contact.email,
      phone: contact.phone
    })
  };
  return fetch('/contacts/' + id, args).then(function (d) {
    return d.json();
  });
}

/* deleteContact DELETE /contacts/:contact_id
 * @params {Number} id the contact id to remove
 * @returns {Promise<{success: true}>}
 */
function deleteContact(id) {
  return fetch('/contacts/' + id, { method: 'DELETE' }).then(function (d) {
    return d.json();
  });
}

/* getContact GET /contacts/contact_id
 * @params {Number} id the contact id to get
 * @returns {Promise<Contact>}
 */
function getContact(id) {
  return fetch('/contacts/' + id, { method: 'GET' }).then(function (d) {
    return d.json();
  }).then(function (d) {
    return {
      firstName: d.first_name,
      lastName: d.last_name,
      birthDay: d.birth_day,
      birthMonth: d.birth_month,
      birthYear: d.birth_year,
      email: d.email,
      phone: d.phone
    };
  });
}

// App - Data and logic for projections is stored here and passed down to children

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

    _this.state = {
      contacts: [],
      group: 'NONE',
      order: 'NONE',
      filter: '',
      showAdd: false
    };
    _this.setOrder = function (e) {
      _this.setState({ order: e.target.value });
    };
    _this.setFilter = function (e) {
      _this.setState({ filter: e.target.value });
    };
    _this.setGroup = function (e) {
      _this.setState({ group: e.target.value });
    };
    _this.handleUpdate = function () {
      _this.setState({ showAdd: false });
      getContacts().then(function (d) {
        return _this.setState({ contacts: d.results });
      });
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.handleUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // These functions are in need of severe refactoring - ideally we would
      // pass the config paramers to a function which would just compute this
      // for us efficiently in a single looop TODO!
      var contacts = this.state.contacts.sort(function (a, b) {
        return a.firstName[0] < b.firstName[0];
      }).filter(function (d) {
        if (_this2.state.filter !== '') {
          return d.firstName.toLowerCase().indexOf(_this2.state.filter) > -1 || d.lastName.toLowerCase().indexOf(_this2.state.filter) > -1;
        }
        return true;
      }).reduce(function (acc, x) {
        var key = void 0;
        switch (_this2.state.group) {
          case 'FIRST':
            key = x.firstName[0];
            break;
          case 'LAST':
            key = x.lastName[0];
            break;
          case 'MONTH':
            key = x.birthMonth;
            break;
          case 'NONE':
          default:
            key = '';
        }
        return acc.set(key, (acc.get(key) || []).concat(x));
      }, new Map());

      return React.createElement(
        'div',
        { className: 'app' },
        React.createElement(
          'div',
          { className: 'title' },
          'Address Book'
        ),
        React.createElement(AppControl, {
          group: this.state.group,
          order: this.state.order,
          filter: this.state.filter,
          setGroup: this.setGroup,
          setFilter: this.setFilter,
          setOrder: this.setOrder
        }),
        React.createElement(
          IfElse,
          { predicate: this.state.showAdd },
          React.createElement(AddContact, { handleUpdate: this.handleUpdate,
            handleCancel: function handleCancel() {
              return _this2.setState({ showAdd: false });
            } }),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this2.setState({ showAdd: true });
              } },
            'New Contact'
          )
        ),
        React.createElement(ContactGroup, { contactGroups: contacts, handleUpdate: this.handleUpdate })
      );
    }
  }]);

  return App;
}(React.Component);

// AppControl - Controlled components for application state and sorting/order


function AppControl(_ref2) {
  var setGroup = _ref2.setGroup;
  var setFilter = _ref2.setFilter;
  var setOrder = _ref2.setOrder;
  var group = _ref2.group;
  var filter = _ref2.filter;

  return React.createElement(
    'div',
    { className: 'app-control' },
    React.createElement('input', { className: 'control-item', type: 'text', value: filter, onChange: setFilter }),
    React.createElement(
      'select',
      { className: 'control-item', value: group, onChange: setGroup },
      React.createElement(
        'option',
        { value: 'NONE' },
        'None'
      ),
      React.createElement(
        'option',
        { value: 'FIRST' },
        'First Name'
      ),
      React.createElement(
        'option',
        { value: 'LAST' },
        'Last Name'
      ),
      React.createElement(
        'option',
        { value: 'MONTH' },
        'Birth Month'
      )
    )
  );
}

/* ContactGroup
 * @param {Map[String => []Contacts]} contactGroups - groups of contacts
 * @param {Function} handleUpdate - forces refetch of all contacts
 * @returns {JSX.Element}
 */
function ContactGroup(_ref3) {
  var contactGroups = _ref3.contactGroups;
  var handleUpdate = _ref3.handleUpdate;

  var groups = [].concat(_toConsumableArray(contactGroups)).sort(function (a, b) {
    return a[0] > b[0];
  }).map(function (d, i) {
    return React.createElement(
      'div',
      { className: 'group-label', key: i },
      React.createElement(
        'span',
        { className: 'group-name' },
        d[0].toString()
      ),
      React.createElement(ContactList, { contacts: d[1], handleUpdate: handleUpdate })
    );
  });
  return React.createElement(
    'div',
    { className: 'contact-group' },
    groups
  );
}

/* ContactList
 * @param {[]Contact} contacts
 * @param {Function} handleUpdate - forces refetch of all contacts
 * @returns {JSX.Element}
 */
function ContactList(_ref4) {
  var contacts = _ref4.contacts;
  var handleUpdate = _ref4.handleUpdate;

  var inner = contacts.map(function (d, i) {
    return React.createElement(MainContact, _extends({ key: i, handleUpdate: handleUpdate }, d));
  });
  return React.createElement(
    'div',
    { className: 'contact-list' },
    inner
  );
}

/* Contact
 * @param {Contact} contact
 * @param {Function} handleUpdate
 * @param {Function} handleEdit
 * @returns {JSX.Element}
 */
function Contact(_ref5) {
  var firstName = _ref5.firstName;
  var lastName = _ref5.lastName;
  var birthDay = _ref5.birthDay;
  var birthMonth = _ref5.birthMonth;
  var birthYear = _ref5.birthYear;
  var email = _ref5.email;
  var phone = _ref5.phone;
  var id = _ref5.id;
  var handleUpdate = _ref5.handleUpdate;
  var handleEdit = _ref5.handleEdit;

  var handleClick = function handleClick() {
    deleteContact(id).then(handleUpdate);
  };
  return React.createElement(
    'div',
    { className: 'contact' },
    React.createElement(
      'div',
      { className: 'head' },
      firstName + ' ' + lastName,
      React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick: handleEdit },
          "EDIT"
        ),
        React.createElement(
          'button',
          { onClick: handleClick },
          "DELETE"
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'rest' },
      React.createElement(
        'span',
        null,
        'Birthday: ' + birthMonth + '-' + birthDay + '-' + birthYear
      ),
      React.createElement(
        'span',
        null,
        'Email: ' + email
      ),
      React.createElement(
        'span',
        null,
        'Phone: ' + phone
      )
    )
  );
}

/* IfElse
 * @param {boolean} predicate
 * @param {[]JSX.Element} children
 * @returns {JSX.Element}
 */
function IfElse(_ref6) {
  var predicate = _ref6.predicate;
  var children = _ref6.children;

  if (predicate) {
    return children[0];
  }
  return children[1];
}

/* MainContact
 * @param {Contact} contact
 * @returns {JSX.Element}
 */

var MainContact = function (_React$Component2) {
  _inherits(MainContact, _React$Component2);

  function MainContact(props) {
    _classCallCheck(this, MainContact);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(MainContact).call(this, props));

    _this3.state = {
      isEditing: false
    };
    _this3.handleEdit = function () {
      _this3.setState({ isEditing: true });
    };
    _this3.handleCancel = function () {
      _this3.setState({ isEditing: false });
    };
    return _this3;
  }

  _createClass(MainContact, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        IfElse,
        { predicate: this.state.isEditing },
        React.createElement(EditContact, { handleCancel: this.handleCancel,
          contact: this.props }),
        React.createElement(Contact, _extends({ handleEdit: this.handleEdit
        }, this.props))
      );
    }
  }]);

  return MainContact;
}(React.Component);

/* EditContact
 * @param {Contact} contact
 * @param {Function} handleCancel
 * @returns {JSX.Element}
 */


function EditContact(_ref7) {
  var contact = _ref7.contact;
  var handleCancel = _ref7.handleCancel;

  var firstNameNode = void 0;
  var lastNameNode = void 0;
  var birthDayNode = void 0;
  var emailNode = void 0;
  var phoneNode = void 0;
  var handleClick = function handleClick() {
    var birth = birthDayNode.value.trim().split('-');
    var response = {
      firstName: firstNameNode.value.trim(),
      lastName: lastNameNode.value.trim(),
      birthDay: birth[2],
      birthMonth: birth[1],
      birthYear: birth[0],
      email: emailNode.value.trim(),
      phone: phoneNode.value.trim()
    };
    if (response.firstName !== '') {
      firstNameNode.value = '';
      lastNameNode.value = '';
      birthDayNode.value = '';
      emailNode.value = '';
      phoneNode.value = '';
      updateContact(contact.id, response).then(contact.handleUpdate);
      handleCancel();
    }
  };
  // Need to format date correctly for form
  var date = contact.birthYear + '-' + (+contact.birthMonth < 10 ? "0" + contact.birthMonth : contact.birthMonth) + '-' + (+contact.birthDay < 10 ? "0" + contact.birthDay : contact.birthDay);
  console.log(date);
  return React.createElement(
    'div',
    { className: 'contact' },
    React.createElement(
      'div',
      { className: 'head' },
      React.createElement('input', { type: 'text',
        ref: function ref(node) {
          return firstNameNode = node;
        },
        defaultValue: contact.firstName
      }),
      React.createElement('input', { type: 'text',
        ref: function ref(node) {
          return lastNameNode = node;
        },
        defaultValue: contact.lastName
      }),
      React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick: handleClick },
          "SAVE"
        ),
        React.createElement(
          'button',
          { onClick: handleCancel },
          "CANCEL"
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'rest' },
      React.createElement(
        'span',
        null,
        'Birthday:',
        React.createElement('input', { type: 'date',
          ref: function ref(node) {
            return birthDayNode = node;
          },
          defaultValue: date })
      ),
      React.createElement(
        'span',
        null,
        'Email:',
        React.createElement('input', { type: 'text',
          ref: function ref(node) {
            return emailNode = node;
          },
          defaultValue: contact.email
        })
      ),
      React.createElement(
        'span',
        null,
        'Phone:',
        React.createElement('input', { type: 'text',
          ref: function ref(node) {
            return phoneNode = node;
          },
          defaultValue: contact.phone
        })
      )
    )
  );
}

/* AddContact
 * @params {Function} handleUpdate
 * @params {Function} handleCancel
 * @returns {JSX.Element}
 */
function AddContact(_ref8) {
  var handleUpdate = _ref8.handleUpdate;
  var handleCancel = _ref8.handleCancel;

  var firstNameNode = void 0;
  var lastNameNode = void 0;
  var birthDayNode = void 0;
  var emailNode = void 0;
  var phoneNode = void 0;
  var handleClick = function handleClick() {
    var birth = birthDayNode.value.trim().split('-');
    var response = {
      firstName: firstNameNode.value.trim(),
      lastName: lastNameNode.value.trim(),
      birthDay: birth[2],
      birthMonth: birth[1],
      birthYear: birth[0],
      email: emailNode.value.trim(),
      phone: phoneNode.value.trim()
    };
    if (response.firstName !== '') {
      firstNameNode.value = '';
      lastNameNode.value = '';
      birthDayNode.value = '';
      emailNode.value = '';
      phoneNode.value = '';
      addContact(response).then(handleUpdate);
    }
  };
  return React.createElement(
    'div',
    { className: 'add-contact' },
    React.createElement(
      'div',
      { className: 'add-item' },
      React.createElement('input', { type: 'text',
        ref: function ref(node) {
          return firstNameNode = node;
        },
        placeholder: 'First Name'
      }),
      React.createElement('input', { type: 'text',
        placeholder: 'Last Name',
        ref: function ref(node) {
          return lastNameNode = node;
        }
      }),
      'Birthday',
      React.createElement('input', { type: 'date',
        ref: function ref(node) {
          return birthDayNode = node;
        }
      }),
      React.createElement('input', { type: 'email',
        placeholder: 'email',
        ref: function ref(node) {
          return emailNode = node;
        }
      }),
      React.createElement('input', { type: 'phone',
        placeholder: 'phone',
        ref: function ref(node) {
          return phoneNode = node;
        }
      }),
      React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick: handleClick },
          'Add'
        ),
        React.createElement(
          'button',
          { onClick: handleCancel },
          'Cancel'
        )
      )
    )
  );
}

// The magic happens here
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
