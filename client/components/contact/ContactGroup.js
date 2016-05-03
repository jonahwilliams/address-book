import ContactList from './ContactList';
/* ContactGroup
 * @param {Map[String => []Contacts]} contactGroups - groups of contacts
 * @param {Function} handleUpdate - forces refetch of all contacts
 * @returns {JSX.Element}
 */
export default function ContactGroup({ contactGroups, handleUpdate, }) {
  const groups = [...contactGroups,]
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
