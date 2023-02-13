const fs = require("fs");
const path = require("path");

const contacts = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.table(list);
      break;

    case "get":
      const getById = await contacts.getContactById(id);
      if (!getById) {
        throw new Error(`There are no contact with id=${id}`);
      }
      console.log(getById);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log("Contact", newContact, "added");
      break;

    case "remove":
      const delContact = await contacts.removeContact(id);
      if (!delContact) {
        throw new Error(`There is no contact with id=${id}`);
      }
      console.log("Contact", delContact.name, "removed ");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
