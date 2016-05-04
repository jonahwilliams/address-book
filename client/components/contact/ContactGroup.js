import React from 'react';
import ContactList from './ContactList';
/* ContactGroup
 * @param {Map[String => []Contacts]} contactGroups - groups of contacts
 * @param {Function} handleUpdate - forces refetch of all contacts
 * @returns {JSX.Element}
 */

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Novemeber',
  'December'
];

function makeKey(x) {
  if (typeof x === 'number') {
    return months[x - 1];
  }
  return x.toUpperCase();
}

export default class ContactGroupList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { contactGroups, handleUpdate } = this.props;
    const groups = [...contactGroups]
      .sort((a, b) => {
        if (typeof a[0] === 'string') {
          if (a[0].toLowerCase() < b[0].toLowerCase()) return -1;
          else if (a[0].toLowerCase() > b[0].toLowerCase()) return 1;
          return 0;
        }
        return a[0] - b[0];
      })
      .map((d, i) => <ContactGroup key={i}
                        handleUpdate={handleUpdate}
                        hashKey={d[0]}
                        values={d[1]}/>);
    return (
      <div className='contact-group'>
        { groups }
     </div>);
  }
}

class ContactGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleOpen = (e) => {
      if (e.target.id === this.props.hashKey.toString() ||
        e.target.id === this.props.hashKey.toString() + "-c") {
        this.setState({ open: !this.state.open });
      }
    };
  }
  render() {
    if (this.state.open || this.props.hashKey === '') {
      return (
        <div className='group-label'
          id={this.props.hashKey + "-c"}
          onClick={this.handleOpen}>
        <span className='group-name'
          id={this.props.hashKey}>
          { makeKey(this.props.hashKey) }
        </span>
        <ContactList contacts={this.props.values}
          handleUpdate={this.props.handleUpdate}/>
      </div>);
    }
    return (
      <div className='group-label'
        id={this.props.hashKey + "-c"}
        onClick={this.handleOpen}>
      <span className='group-name'
        id={this.props.hashKey}>
        { makeKey(this.props.hashKey) }
      </span>
    </div>);
  }
}
