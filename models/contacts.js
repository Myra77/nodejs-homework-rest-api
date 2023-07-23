import fs from "fs/promises";
import path from "path";

import  { v4 } from "uuid";

const contactsPath = path.resolve("models", "contacts.json");


export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  return contacts;
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => id === contactId);

  return result || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedIndex = contacts.findIndex(({ id }) => id === contactId);

  if (removedIndex === -1) return null;
  const [removeContact] = contacts.splice(removedIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removeContact;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = (await listContacts()) || [];
  const newContact = { id: v4(), name, email, phone  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

export const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const updateIndex = contacts.findIndex(({ id }) => id === contactId);
  if (updateIndex === -1) return null;
  contacts[updateIndex] = { id: contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[updateIndex];
};
