import express from "express";
import {
  getAll,
  getById,
  postNewContact,
  putContact,
  deleteContact,
} from "../../controllers/controllers.js";

import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const contactsRouter = express.Router()

contactsRouter.get('/', ctrlWrapper(getAll));

// contactsRouter.get("/:contactId", ctrlWrapper(getById));

// contactsRouter.post("/", ctrlWrapper(postNewContact));

// contactsRouter.put("/:contactId", ctrlWrapper(putContact));

// contactsRouter.delete("/:contactId", ctrlWrapper(deleteContact));

export default contactsRouter;