import * as api from '../../api';
/* Contact
 * @param {Contact} contact
 * @param {Function} handleUpdate
 * @param {Function} handleEdit
 * @returns {JSX.Element}
 */
export default function Contact({ firstName, lastName, birthDay,
  birthMonth, birthYear, email, phone, id, handleUpdate, handleEdit, }) {
  const handleClick = function handleClick() {
    api.deleteContact(id).then(handleUpdate);
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
