import * as api from '../../api';
/* EditContact
 * @param {Contact} contact
 * @param {Function} handleCancel
 * @returns {JSX.Element}
 */
export default function EditContact({ contact, handleCancel, }) {
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
      api.updateContact(contact.id, response)
        .then(contact.handleUpdate);
      handleCancel();
    }
  };
  // Need to format date correctly for form
  const date =  `${contact.birthYear}-${
      +contact.birthMonth < 10
        ? "0" + contact.birthMonth
        : contact.birthMonth
    }-${
      +contact.birthDay < 10
        ? "0" + contact.birthDay
        : contact.birthDay
    }`;
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
            defaultValue={date}/>
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
