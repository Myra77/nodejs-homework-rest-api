import express from "express";
import {
  getAll,
  getById,
  postNewContact,
  putContact,
  deleteContact,
} from "../../controllers/controllers.js";

export const contactsRouter = express.Router()

contactsRouter.get('/', getAll);

contactsRouter.get("/:contactId", getById);

contactsRouter.post("/", postNewContact);

contactsRouter.put("/:contactId", putContact);

contactsRouter.delete("/:contactId", deleteContact);

export default contactsRouter;