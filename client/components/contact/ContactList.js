import React from 'react';
import MainContact from './MainContact';
/* ContactList
 * @param {[]Contact} contacts
 * @param {Function} handleUpdate - forces refetch of all contacts
 * @returns {JSX.Element}
 */
export default class ContactList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { contacts, handleUpdate} = this.props;
    const inner = contacts.map((d, i) => {
      return (<MainContact key={i} handleUpdate={handleUpdate} {...d}/>);
    });
    return (
      <div className="contact-list">
          { inner }
      </div>);
  }
}
