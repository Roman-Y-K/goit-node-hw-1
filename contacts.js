const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const {
  getParsedData,
  findContact,
  deleteContact,
} = require("/Users/Дом/Documents/GitHub/goit-node-hw-1/utils/utils");

const contactsPath = path.relative(
  "/Users/Дом/Documents/GitHub/goit-node-hw-1",
  "/Users/Дом/Documents/GitHub/goit-node-hw-1/db/contacts.json"
);

function listContacts() {
  return fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }

    const contacts = getParsedData(data);

    console.table(contacts);
  });
}

function getContactById(contactId) {
  return fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }

    const contacts = getParsedData(data);

    const user = findContact(contacts, contactId);

    console.log(user);
  });
}

function removeContact(contactId) {
  return fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }

    const contacts = getParsedData(data);
    const user = findContact(contacts, contactId);

    if (!user) {
      console.log("Contact did not find");
      return;
    }

    const newData = deleteContact(contacts, contactId);

    fs.writeFile(contactsPath, newData, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Contact deleted");
      return;
    });
  });
}

function addContact(name, email, phone) {
  const newContact = { id: shortid.generate(), name, email, phone };

  return fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }

    const contacts = getParsedData(data);

    const isInContact = contacts.find(
      (contact) => contact.name === newContact.name
    );

    if (isInContact) {
      return;
    } else {
      contacts.push(newContact);
      const parsedData = JSON.stringify(contacts);

      fs.writeFile(contactsPath, parsedData, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Contact added");
          console.table(contacts);
        }
        return;
      });
    }
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
