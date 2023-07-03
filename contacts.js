const fs = require('fs').promises;
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  }
  
  async function getContactById(id) {
    const contactId = String(id);
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
  }
  
    
  async function addContact(data) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
     }
     contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }

  async function updateById(id, data) {
    const contactId = String(id);
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(item => item.id === contactId);
    if (contactIndex === -1) {
        return null;
    }
    contacts[contactIndex] = { id, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[contactIndex];
  }

  async function removeContact(id) {
    const contactId = String(id);
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(item => item.id === contactId);
    if (contactIndex === -1) {
        return null;
    }
    const [result] = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  }

module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateById,
    removeContact,
}