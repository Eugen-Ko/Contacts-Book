const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => JSON.parse(await fs.readFile(contactsPath));

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const res = contacts.find(({ id }) => String(id) === String(contactId));
  return res || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    ({ id }) => String(id) === String(contactId)
  );
  if (contactIndex === -1) return null;
  contacts[contactIndex] = { id: contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[contactIndex];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    ({ id }) => String(id) === String(contactId)
  );
  if (contactIndex === -1) return null;
  const res = contacts.filter(({ id }) => String(id) !== String(contactId));
  await fs.writeFile(contactsPath, JSON.stringify(res));
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
