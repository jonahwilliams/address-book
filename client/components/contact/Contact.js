import * as api from '../../api';
import Button from '../shared/Button';

/* Contact
 * @param {Contact} contact
 * @param {Function} handleUpdate
 * @param {Function} handleEdit
 * @returns {JSX.Element}
 */
export default function Contact({ firstName, lastName, birthDay,
  birthMonth, birthYear, email, phone, id, handleUpdate, handleEdit }) {
  const handleClick = function handleClick() {
    api.deleteContact(id).then(handleUpdate);
  };
  return (
    <div className="contact">
      <div className="head">
        {`${firstName} ${lastName}`}
        <div>
          <Button handleClick={handleEdit}>
            {"EDIT"}
          </Button>
          <Button handleClick={handleClick}>
            {"DELETE"}
          </Button>
        </div>
      </div>
      <div className="rest">
        <span>{`Birthday: ${birthMonth}-${birthDay}-${birthYear}`}</span>
        <span>{`Email: ${email}`}</span>
        <span>{`Phone: ${phone}`}</span>
      </div>
    </div>);
}
