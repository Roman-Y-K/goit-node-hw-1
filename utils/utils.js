function getParsedData(data) {
  const string = data.toString();
  return JSON.parse(string);
}

function findContact(contacts, contactId) {
  return contacts.find((contact) => String(contact.id) === String(contactId));
}

function deleteContact(contacts, contactId) {
  const users = contacts.filter(
    (contact) => String(contact.id) !== String(contactId)
  );

  return JSON.stringify(users);
}

module.exports = { getParsedData, findContact, deleteContact };
