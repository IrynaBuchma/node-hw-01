const contacts = require('./contacts');

const {program} = require('commander');

const invokeAction = async({ action, id, name, email, phone }) => {
    switch(action) {
      case 'list': 
        const list = await contacts.listContacts();
        return console.table(list);

      case 'get':
        const getContact = await contacts.getContactById(id);
        return console.table(getContact);

      case 'add':
        const newContact = await contacts.addContact({ name, email, phone });
        return console.table(newContact);

      case 'update':
            const updateContact = await contacts.updateById(id, { name, email, phone});
            return console.table(updateContact);

      case 'remove':
        const removeContact = await contacts.removeContact(id);
        return console.table(removeContact);

      default:
        return console.log("Unknown action type!");
    }
}

program
    .option('-a, --action, <type>', 'choose action')
    .option('-i, --id, <type>', 'user id')
    .option('-n, --name, <type>', 'user name')
    .option('-e, --email, <type>', 'user email')
    .option('-p, --phone, <type>', 'user phone');

program.parse();

const options = program.opts();

invokeAction(options);