(function () {
  'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers;

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

  function Button(_ref) {
    var handleClick = _ref.handleClick;
    var children = _ref.children;

    return React.createElement(
      'div',
      { className: 'custom-button',
        onClick: handleClick },
      children
    );
  }

  /* AddContact - needs to be class to be testable by jest
   * @params {Function} handleUpdate
   * @params {Function} handleCancel
   * @returns {JSX.Element}
   */
  function AddContact(_ref) {
    var handleUpdate = _ref.handleUpdate;
    var handleCancel = _ref.handleCancel;

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
            Button,
            { handleClick: handleClick },
            'ADD'
          ),
          React.createElement(
            Button,
            { handleClick: handleCancel },
            'CANCEL'
          )
        )
      )
    );
  }

  /* EditContact
   * @param {Contact} contact
   * @param {Function} handleCancel
   * @returns {JSX.Element}
   */
  function EditContact(_ref) {
    var contact = _ref.contact;
    var handleCancel = _ref.handleCancel;

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
    return React.createElement(
      'div',
      { className: 'contact' },
      React.createElement(
        'div',
        { className: 'head' },
        React.createElement(
          'span',
          null,
          'First Name:',
          React.createElement('input', { type: 'text',
            ref: function ref(node) {
              return firstNameNode = node;
            },
            defaultValue: contact.firstName
          })
        ),
        React.createElement(
          'span',
          null,
          "Last Name:",
          React.createElement('input', { type: 'text',
            ref: function ref(node) {
              return lastNameNode = node;
            },
            defaultValue: contact.lastName
          })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            Button,
            { handleClick: handleClick },
            "SAVE"
          ),
          React.createElement(
            Button,
            { handleClick: handleCancel },
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

  /* Contact
   * @param {Contact} contact
   * @param {Function} handleUpdate
   * @param {Function} handleEdit
   * @returns {JSX.Element}
   */
  function Contact(_ref) {
    var firstName = _ref.firstName;
    var lastName = _ref.lastName;
    var birthDay = _ref.birthDay;
    var birthMonth = _ref.birthMonth;
    var birthYear = _ref.birthYear;
    var email = _ref.email;
    var phone = _ref.phone;
    var id = _ref.id;
    var handleUpdate = _ref.handleUpdate;
    var handleEdit = _ref.handleEdit;

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
            Button,
            { handleClick: handleEdit },
            "EDIT"
          ),
          React.createElement(
            Button,
            { handleClick: handleClick },
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
  function IfElse(_ref) {
    var predicate = _ref.predicate;
    var children = _ref.children;

    if (predicate) {
      return children[0];
    }
    return children[1];
  }

  var MainContact = function (_React$Component) {
    babelHelpers.inherits(MainContact, _React$Component);

    function MainContact(props) {
      babelHelpers.classCallCheck(this, MainContact);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(MainContact).call(this, props));

      _this.state = {
        isEditing: false
      };
      _this.handleEdit = function () {
        _this.setState({ isEditing: true });
      };
      _this.handleCancel = function () {
        _this.setState({ isEditing: false });
      };
      return _this;
    }

    babelHelpers.createClass(MainContact, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          IfElse,
          { predicate: this.state.isEditing },
          React.createElement(EditContact, { handleCancel: this.handleCancel,
            contact: this.props }),
          React.createElement(Contact, babelHelpers.extends({ handleEdit: this.handleEdit
          }, this.props))
        );
      }
    }]);
    return MainContact;
  }(React.Component);

  /* ContactList
   * @param {[]Contact} contacts
   * @param {Function} handleUpdate - forces refetch of all contacts
   * @returns {JSX.Element}
   */

  var ContactList = function (_React$Component) {
    babelHelpers.inherits(ContactList, _React$Component);

    function ContactList(props) {
      babelHelpers.classCallCheck(this, ContactList);
      return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ContactList).call(this, props));
    }

    babelHelpers.createClass(ContactList, [{
      key: "render",
      value: function render() {
        var _props = this.props;
        var contacts = _props.contacts;
        var handleUpdate = _props.handleUpdate;

        var inner = contacts.map(function (d, i) {
          return React.createElement(MainContact, babelHelpers.extends({ key: i, handleUpdate: handleUpdate }, d));
        });
        return React.createElement(
          "div",
          { className: "contact-list" },
          inner
        );
      }
    }]);
    return ContactList;
  }(React.Component);

  /* ContactGroup
   * @param {Map[String => []Contacts]} contactGroups - groups of contacts
   * @param {Function} handleUpdate - forces refetch of all contacts
   * @returns {JSX.Element}
   */

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'];

  function makeKey(x) {
    if (typeof x === 'number') {
      return months[x - 1];
    }
    return x.toUpperCase();
  }

  var ContactGroupList = function (_React$Component) {
    babelHelpers.inherits(ContactGroupList, _React$Component);

    function ContactGroupList(props) {
      babelHelpers.classCallCheck(this, ContactGroupList);
      return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ContactGroupList).call(this, props));
    }

    babelHelpers.createClass(ContactGroupList, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var contactGroups = _props.contactGroups;
        var handleUpdate = _props.handleUpdate;

        var groups = [].concat(babelHelpers.toConsumableArray(contactGroups)).sort(function (a, b) {
          if (typeof a[0] === 'string') {
            if (a[0].toLowerCase() < b[0].toLowerCase()) return -1;else if (a[0].toLowerCase() > b[0].toLowerCase()) return 1;
            return 0;
          }
          return a[0] - b[0];
        }).map(function (d, i) {
          return React.createElement(ContactGroup, { key: i,
            handleUpdate: handleUpdate,
            hashKey: d[0],
            values: d[1] });
        });
        return React.createElement(
          'div',
          { className: 'contact-group' },
          groups
        );
      }
    }]);
    return ContactGroupList;
  }(React.Component);

  var ContactGroup = function (_React$Component2) {
    babelHelpers.inherits(ContactGroup, _React$Component2);

    function ContactGroup(props) {
      babelHelpers.classCallCheck(this, ContactGroup);

      var _this2 = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ContactGroup).call(this, props));

      _this2.state = {
        open: false
      };
      _this2.handleOpen = function (e) {
        if (e.target.id === _this2.props.hashKey.toString() || e.target.id === _this2.props.hashKey.toString() + "-c") {
          _this2.setState({ open: !_this2.state.open });
        }
      };
      return _this2;
    }

    babelHelpers.createClass(ContactGroup, [{
      key: 'render',
      value: function render() {
        if (this.state.open || this.props.hashKey === '') {
          return React.createElement(
            'div',
            { className: 'group-label',
              id: this.props.hashKey + "-c",
              onClick: this.handleOpen },
            React.createElement(
              'span',
              { className: 'group-name',
                id: this.props.hashKey },
              makeKey(this.props.hashKey)
            ),
            React.createElement(ContactList, { contacts: this.props.values,
              handleUpdate: this.props.handleUpdate })
          );
        }
        return React.createElement(
          'div',
          { className: 'group-label',
            id: this.props.hashKey + "-c",
            onClick: this.handleOpen },
          React.createElement(
            'span',
            { className: 'group-name',
              id: this.props.hashKey },
            makeKey(this.props.hashKey)
          )
        );
      }
    }]);
    return ContactGroup;
  }(React.Component);

  function AppControl(_ref) {
    var setGroup = _ref.setGroup;
    var setFilter = _ref.setFilter;
    var group = _ref.group;
    var filter = _ref.filter;

    return React.createElement(
      "div",
      { className: "app-control" },
      React.createElement("input", { className: "control-item",
        type: "text",
        value: filter,
        placeholder: "SEARCH CONTACTS",
        onChange: setFilter }),
      React.createElement(
        "select",
        { className: "control-item", value: group, onChange: setGroup },
        React.createElement(
          "option",
          { value: "NONE" },
          'None'
        ),
        React.createElement(
          "option",
          { value: "FIRST" },
          'First Name'
        ),
        React.createElement(
          "option",
          { value: "LAST" },
          'Last Name'
        ),
        React.createElement(
          "option",
          { value: "MONTH" },
          'Birth Month'
        )
      )
    );
  }

  /* orderBy
   * @param {Array<T>} xs - an array of xs
   * @param {T => Value} key - function from T to comparable value type
   * @param {boolean} asc - ascending or descending
   * @returns {Array<T>}
   */
  function orderBy(xs) {
    var key = arguments.length <= 1 || arguments[1] === undefined ? function (x) {
      return x;
    } : arguments[1];
    var asc = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

    if (asc) {
      return xs.sort(function (a, b) {
        if (key(a) > key(b)) {
          return 1;
        } else if (key(a) < key(b)) {
          return -1;
        }
        return 0;
      });
    }
    return xs.sort(function (a, b) {
      if (key(a) > key(b)) {
        return -1;
      } else if (key(a) < key(b)) {
        return 1;
      }
      return 0;
    });
  }

  /* groupBy
   * @param {Array<T>} xs - Array of T
   * @param {T => Value} key - function from T to hashable type
   * @returns {Map[Value => Array<T>]}
   */
  function groupBy(xs) {
    var key = arguments.length <= 1 || arguments[1] === undefined ? function (x) {
      return x;
    } : arguments[1];

    var result = new Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = xs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var x = _step.value;

        var k = key(x);
        result.set(k, (result.get(k) || []).concat(x));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return result;
  }

  var groupFuncs = {
    'NONE': function NONE() {
      return '';
    },
    'FIRST': function FIRST(x) {
      return x.firstName[0].toLowerCase();
    },
    'LAST': function LAST(x) {
      return x.lastName[0].toLowerCase();
    },
    'MONTH': function MONTH(x) {
      return +x.birthMonth;
    }
  };

  var App = function (_React$Component) {
    babelHelpers.inherits(App, _React$Component);

    function App() {
      babelHelpers.classCallCheck(this, App);

      var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

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

    babelHelpers.createClass(App, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.handleUpdate();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var groupKey = groupFuncs[this.state.group];
        var contacts = this.state.contacts.filter(function (d) {
          if (_this2.state.filter !== '') {
            return d.firstName.toLowerCase().indexOf(_this2.state.filter) > -1 || d.lastName.toLowerCase().indexOf(_this2.state.filter) > -1;
          }
          return true;
        });
        var transformed = groupBy(orderBy(contacts, function (a) {
          return a.firstName[0].toLowerCase();
        }), groupKey);

        return React.createElement(
          'div',
          { className: 'app' },
          React.createElement(
            'div',
            { className: 'header' },
            React.createElement(
              'div',
              { className: 'title' },
              'ADDRSSR'
            ),
            React.createElement(AppControl, {
              group: this.state.group,
              order: this.state.order,
              filter: this.state.filter,
              setGroup: this.setGroup,
              setFilter: this.setFilter,
              setOrder: this.setOrder
            })
          ),
          React.createElement(
            'div',
            { className: 'content' },
            React.createElement(
              IfElse,
              { predicate: this.state.showAdd },
              React.createElement(AddContact, {
                handleUpdate: this.handleUpdate,
                handleCancel: function handleCancel() {
                  return _this2.setState({ showAdd: false });
                } }),
              React.createElement(
                'div',
                { className: 'add-contact' },
                React.createElement(
                  'div',
                  { className: 'add-item' },
                  React.createElement(
                    Button,
                    { handleClick: function handleClick() {
                        return _this2.setState({ showAdd: true });
                      } },
                    'NEW CONTACT'
                  )
                )
              )
            ),
            React.createElement(ContactGroupList, { contactGroups: transformed,
              handleUpdate: this.handleUpdate })
          )
        );
      }
    }]);
    return App;
  }(React.Component);

  ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

}());