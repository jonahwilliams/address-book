// global React, ReactDOM


// API
function getContacts() {
  return fetch('/contacts', { method: 'GET' })
    .then(d => d.json())
    .then(b => ({
      results: b.results.map(d => ({
        firstName: d.first_name,
        lastName: d.last_name,
        birthDay: d.birth_day,
        birthMonth: d.birth_month,
        birthYear: d.birth_year,
        email: d.email,
        phone: d.phone,
        id: d.id,
      })),
    }));
}

function addContact({ firstName, lastName, birthDay, birthMonth,
  birthYear, email, phone }) {
  const args = {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      birth_day: birthDay,
      birth_month: birthMonth,
      birth_year: birthYear,
      email,
      phone,
    }),
  };
  return fetch('/contacts', args)
      .then(d => d.json());
}

function updateContact(id, contact) {
  const args = {
    method: 'PUT',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      first_name: contact.firstName,
      last_name: contact.lastName,
      birth_day: contact.birthDay,
      birth_month: contact.birthMonth,
      birth_year: contact.birthYear,
      email: contact.email,
      phone: contact.phone,
    }),
  };
  return fetch(`/contacts/${id}`, args)
    .then(d => d.json());
}

function deleteContact(id) {
  return fetch(`/contacts/${id}`, { method: 'DELETE' })
    .then(d => d.json());
}

function getContact(id) {
  return fetch(`/contacts/${id}`, { method: 'GET' })
    .then(d => d.json())
    .then(d => ({
      firstName: d.first_name,
      lastName: d.last_name,
      birthDay: d.birth_day,
      birthMonth: d.birth_month,
      birthYear: d.birth_year,
      email: d.email,
      phone: d.phone,
    }));
}

// App - Data and logic for projections is stored here and passed down to children
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      group: 'NONE',
      order: 'NONE',
      filter: '',
      showAdd: false,
    };
    this.setOrder = (e) => {
      this.setState({ order: e.target.value });
    };
    this.setFilter = (e) => {
      this.setState({ filter: e.target.value });
    };
    this.setGroup = (e) => {
      this.setState({ group: e.target.value });
    };
    this.handleUpdate = () => {
      this.setState({ showAdd: false });
      getContacts().then(d => this.setState({ contacts: d.results }));
    };
  }
  componentWillMount() {
    this.handleUpdate();
  }
  render() {
    // These functions are in need of severe refactoring - ideally we would
    // pass the config paramers to a function which would just compute this
    // for us efficiently in a single looop TODO!
    const contacts = this.state.contacts
      .sort((a, b) => a.firstName[0] < b.firstName[0])
      .filter(d => {
        if (this.state.filter !== '') {
          return d.firstName.toLowerCase().indexOf(this.state.filter) > -1 ||
            d.lastName.toLowerCase().indexOf(this.state.filter) > -1;
        }
        return true;
      })
      .reduce((acc, x) => {
        let key;
        switch (this.state.group) {
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

    return (
      <div className="app">
        <div className="title">{'Address Book'}</div>
        <AppControl
          group={this.state.group}
          order={this.state.order}
          filter={this.state.filter}
          setGroup={this.setGroup}
          setFilter={this.setFilter}
          setOrder={this.setOrder}
        />
        <IfElse predicate={this.state.showAdd}>
          <AddContact handleUpdate={this.handleUpdate}
            handleCancel={() => this.setState({showAdd: false})}/>
          <button onClick={() => this.setState({ showAdd: true })}>
            {'New Contact'}
          </button>
        </IfElse>
        <ContactGroup contactGroups={contacts} handleUpdate={this.handleUpdate}/>
      </div>);
  }
}

// AppControl - Controlled components for application state and sorting/order
function AppControl({ setGroup, setFilter, setOrder, group, filter }) {
  return (
    <div className="app-control">
      <input className="control-item" type="text" value={filter} onChange={setFilter}/>
      <select className="control-item" value={group} onChange={setGroup}>
        <option value="NONE">{'None'}</option>
        <option value="FIRST">{'First Name'}</option>
        <option value="LAST">{'Last Name'}</option>
        <option value="MONTH">{'Birth Month'}</option>
      </select>
    </div>);
}

function ContactGroup({ contactGroups, handleUpdate }) {
  const groups = [...contactGroups]
    .sort((a, b) => a[0] > b[0])
    .map((d, i) => {
      return (
        <div className='group-label' key={i}>
          <span className='group-name'>{ d[0].toString() }</span>
          <ContactList contacts={d[1]} handleUpdate={handleUpdate}/>
        </div>);
    });
  return (
    <div className='contact-group'>
      { groups }
   </div>);
}

function ContactList({ contacts, handleUpdate }) {
  const inner = contacts.map((d, i) => {
    return (<MainContact key={i} handleUpdate={handleUpdate} {...d}/>);
  });
  return (
    <div className="contact-list">
        { inner }
    </div>);
}

// Contact - React Component to render individual contact
function Contact({ firstName, lastName, birthDay,
  birthMonth, birthYear, email, phone, id, handleUpdate, handleEdit}) {
  const handleClick = function handleClick() {
    deleteContact(id).then(handleUpdate);
  };
  return (
    <div className="contact">
      <div className="head">
        {`${firstName} ${lastName}`}
        <div>
          <button onClick={handleEdit}>
            {"EDIT"}
          </button>
          <button onClick={handleClick}>
            {"DELETE"}
          </button>
        </div>
      </div>
      <div className="rest">
        <span>{`Birthday: ${birthMonth}-${birthDay}-${birthYear}`}</span>
        <span>{`Email: ${email}`}</span>
        <span>{`Phone: ${phone}`}</span>
      </div>
    </div>);
}

function IfElse({ predicate, children }) {
  if (predicate) {
    return children[0];
  }
  return children[1];
}

class MainContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
    this.handleEdit = () => {
      this.setState({ isEditing: true });
    };
    this.handleCancel = () => {
      this.setState({ isEditing: false });
    }
  }
  render() {
    return (
      <IfElse predicate={this.state.isEditing}>
        <EditContact handleCancel={this.handleCancel}
          contact={this.props}/>
        <Contact handleEdit={this.handleEdit}
          {...this.props}/>
      </IfElse>);
  }
}

function EditContact({ contact, handleCancel }) {
  let firstNameNode;
  let lastNameNode;
  let birthDayNode;
  let emailNode;
  let phoneNode;
  const handleClick = function handleClick() {
    const birth = birthDayNode.value.trim().split('-');
    const response = {
      firstName: firstNameNode.value.trim(),
      lastName: lastNameNode.value.trim(),
      birthDay: birth[2],
      birthMonth: birth[1],
      birthYear: birth[0],
      email: emailNode.value.trim(),
      phone: phoneNode.value.trim(),
    };
    if (response.firstName !== '') {
      firstNameNode.value = '';
      lastNameNode.value = '';
      birthDayNode.value = '';
      emailNode.value = '';
      phoneNode.value = '';
      updateContact(contact.id, response)
        .then(contact.handleUpdate);
      handleCancel();
    }
  };
  return (
    <div className="contact">
      <div className="head">
        <input type="text"
          ref={node => firstNameNode = node}
          defaultValue={contact.firstName}
          />
        <input type="text"
          ref={node => lastNameNode = node}
          defaultValue={contact.lastName}
          />
        <div>
          <button onClick={handleClick}>
            {"SAVE"}
          </button>
          <button onClick={handleCancel}>
            {"CANCEL"}
          </button>
        </div>
      </div>
      <div className="rest">
        <span>
          {`Birthday:`}
          <input type="date"
            ref={node => birthDayNode = node}
            defaultValue={`${contact.birthYear}-${contact.birthMonth}-${contact.birthDay}`}
          />
        </span>
        <span>
          {`Email:`}
          <input type="text"
            ref={node => emailNode = node}
            defaultValue={contact.email}
          />
        </span>
        <span>
          {`Phone:`}
          <input type="text"
            ref={node => phoneNode = node}
            defaultValue={contact.phone}
          />
        </span>
      </div>
    </div>);
}

// AddContact - Contact form which posts new contact to /contacts
function AddContact({ handleUpdate, handleCancel }) {
  let firstNameNode;
  let lastNameNode;
  let birthDayNode;
  let emailNode;
  let phoneNode;
  const handleClick = function handleClick() {
    const birth = birthDayNode.value.trim().split('-');
    const response = {
      firstName: firstNameNode.value.trim(),
      lastName: lastNameNode.value.trim(),
      birthDay: birth[2],
      birthMonth: birth[1],
      birthYear: birth[0],
      email: emailNode.value.trim(),
      phone: phoneNode.value.trim(),
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
  return (
    <div className="add-contact">
      <div className='add-item'>
        <input type="text"
          ref={node => firstNameNode = node}
          placeholder="First Name"
        />
        <input type="text"
          placeholder="Last Name"
          ref={node => lastNameNode = node}
        />
        {'Birthday'}
        <input type="date"
          ref={node => birthDayNode = node}
        />
        <input type="email"
          placeholder="email"
          ref={node => emailNode = node}
        />
        <input type="phone"
          placeholder="phone"
          ref={node => phoneNode = node}
        />
      <div>
        <button onClick={handleClick}>
          {'Add'}
        </button>
        <button onClick={handleCancel}>
          {'Cancel'}
        </button>
      </div>
    </div>
    </div>);
}

// The magic happens here
ReactDOM.render(<App/>, document.getElementById('app'));
