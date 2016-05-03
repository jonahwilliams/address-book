/* global React */
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

export default class ContactGroup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { contactGroups, handleUpdate } = this.props;
    const groups = [...contactGroups]
      .sort(([k1], [k2]) => {
        return k1 > k2;
      })
      .map((d, i) => {
        return (
          <div className='group-label' key={i}>
            <span className='group-name'>{ makeKey(d[0]) }</span>
            <ContactList contacts={d[1]}
              handleUpdate={handleUpdate}/>
          </div>);
      });
    return (
      <div className='contact-group'>
        { groups }
     </div>);
  }
}
