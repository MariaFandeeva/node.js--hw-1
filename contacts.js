const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const res = await fs.readFile(contactsPath);
  const data = JSON.parse(res);
  return data;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((el) => el.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const result = data.filter((_, i) => i !== index);
  fs.writeFile(contactsPath, JSON.stringify(result));
  return data[index];
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  data.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
}
module.exports = { listContacts, getContactById, removeContact, addContact };
