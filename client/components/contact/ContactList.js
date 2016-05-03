import MainContact from './MainContact';
/* ContactList
 * @param {[]Contact} contacts
 * @param {Function} handleUpdate - forces refetch of all contacts
 * @returns {JSX.Element}
 */
export default function ContactList({ contacts, handleUpdate, }) {
  const inner = contacts.map((d, i) => {
    return (<MainContact key={i} handleUpdate={handleUpdate} {...d}/>);
  });
  return (
    <div className="contact-list">
        { inner }
    </div>);
}
