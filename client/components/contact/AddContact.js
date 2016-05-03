import * as api from '../../api';
import Button from '../shared/Button';

/* AddContact - needs to be class to be testable by jest
 * @params {Function} handleUpdate
 * @params {Function} handleCancel
 * @returns {JSX.Element}
 */
export default function AddContact({ handleUpdate, handleCancel }) {
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
      phone: phoneNode.value.trim()
    };
    if (response.firstName !== '') {
      firstNameNode.value = '';
      lastNameNode.value = '';
      birthDayNode.value = '';
      emailNode.value = '';
      phoneNode.value = '';
      api.addContact(response).then(handleUpdate);
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
        <Button handleClick={handleClick}>
          {'ADD'}
        </Button>
        <Button handleClick={handleCancel}>
          {'CANCEL'}
        </Button>
      </div>
    </div>
  </div>);
}
