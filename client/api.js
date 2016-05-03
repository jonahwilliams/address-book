/* interface Contact {
 *    firstName: string;
 *    lastName:  string;
 *    birthDay:  string;
 *    birthMonth: string;
 *    birthYear:  string;
 *    email: string;
 *    phone: string;
 * }
 */

/* getContacts GET /contacts
 * @returns{[]Contact}
 */
export function getContacts() {
  return fetch('/contacts', { method: 'GET', })
    .then(d => d.json())
    .then(b => ({
      results: b.results.map(d => ({
        firstName: d.first_name,
        lastName: d.last_name,
        birthDay: d.birth_day,
        birthMonth: d.birth_month,
        birthYear: d.birth_year,
        email: d.email,
        phone: d.phone,
        id: d.id,
      })),
    }));
}

/* addContact POST /contacts
 * @param {Object} Contact
 * @returns {Promise<{success: boolean}>}
 */
export function addContact({ firstName, lastName, birthDay, birthMonth,
  birthYear, email, phone, }) {
  const args = {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json', }),
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      birth_day: birthDay,
      birth_month: birthMonth,
      birth_year: birthYear,
      email,
      phone,
    }),
  };
  return fetch('/contacts', args)
      .then(d => d.json());
}

/* updateContact PUT /contacts/:contact_id
 * @param {Number} id the id of contact to be update
 * @param {Contact} contact the fields to be updated
 * @returns {Promise<{success: boolean}>}
 */
export function updateContact(id, contact) {
  const args = {
    method: 'PUT',
    headers: new Headers({ 'Content-Type': 'application/json', }),
    body: JSON.stringify({
      first_name: contact.firstName,
      last_name: contact.lastName,
      birth_day: contact.birthDay,
      birth_month: contact.birthMonth,
      birth_year: contact.birthYear,
      email: contact.email,
      phone: contact.phone,
    }),
  };
  return fetch(`/contacts/${id}`, args)
    .then(d => d.json());
}

/* deleteContact DELETE /contacts/:contact_id
 * @params {Number} id the contact id to remove
 * @returns {Promise<{success: true}>}
 */
export function deleteContact(id) {
  return fetch(`/contacts/${id}`, { method: 'DELETE', })
    .then(d => d.json());
}


/* getContact GET /contacts/contact_id
 * @params {Number} id the contact id to get
 * @returns {Promise<Contact>}
 */
export function getContact(id) {
  return fetch(`/contacts/${id}`, { method: 'GET', })
    .then(d => d.json())
    .then(d => ({
      firstName: d.first_name,
      lastName: d.last_name,
      birthDay: d.birth_day,
      birthMonth: d.birth_month,
      birthYear: d.birth_year,
      email: d.email,
      phone: d.phone,
    }));
}
