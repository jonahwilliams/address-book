/* global React */
import * as api from '../api';
import AddContact from './contact/AddContact';
import ContactGroupList from './contact/ContactGroup';
import IfElse from './shared/IfElse';
import Controls from './controls/Controls';
import orderBy from '../collection/orderBy';
import groupBy from '../collection/groupBy';
import Button from './shared/Button';

const groupFuncs = {
  'NONE': () => '',
  'FIRST': (x) => x.firstName[0].toLowerCase(),
  'LAST': (x) => x.lastName[0].toLowerCase(),
  'MONTH': (x) => +x.birthMonth
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      group: 'NONE',
      order: 'NONE',
      filter: '',
      showAdd: false
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
      api.getContacts().then(d => this.setState({ contacts: d.results }));
    };
  }
  componentWillMount() {
    this.handleUpdate();
  }
  render() {
    const groupKey = groupFuncs[this.state.group];
    const contacts = this.state.contacts.filter(d => {
      if (this.state.filter !== '') {
        return d.firstName.toLowerCase().indexOf(this.state.filter) > -1 ||
          d.lastName.toLowerCase().indexOf(this.state.filter) > -1;
      }
      return true;
    });
    const transformed = groupBy(
      orderBy(contacts, (a) => a.firstName[0].toLowerCase()),
      groupKey
    );

    return (
      <div className="app">
        <div className="header">
          <div className="title">
            {'ADDRSSR'}
          </div>
          <Controls
            group={this.state.group}
            order={this.state.order}
            filter={this.state.filter}
            setGroup={this.setGroup}
            setFilter={this.setFilter}
            setOrder={this.setOrder}
          />
        </div>
        <div className="content">
          <IfElse predicate={this.state.showAdd}>
            <AddContact
              handleUpdate={this.handleUpdate}
              handleCancel={() => this.setState({showAdd: false })}/>
            <div className="add-contact">
              <div className="add-item">
                <Button handleClick={() => this.setState({ showAdd: true })}>
                  {'NEW CONTACT'}
                </Button>
              </div>
            </div>
          </IfElse>
          <ContactGroupList contactGroups={transformed}
            handleUpdate={this.handleUpdate}/>
        </div>
      </div>
    );
  }
}
