import express from "express";
import {
  getAll,
  getById,
  postNewContact,
  putContact,
  deleteContact,
  updateStatusContact,
} from "../../controllers/controllers.js";

import { ctrlWrapper } from "../../decorators/index.js";
import { isValidId } from "../../middlewares/index.js";
import { validateBody } from "../../middlewares/index.js";
import { addSchema, contactUpdateFavoriteSchema } from "../../helpers/index.js";
import { authenticate } from "../../middlewares/index.js";

export const contactsRouter = express.Router()

contactsRouter.get("/", authenticate, ctrlWrapper(getAll));

contactsRouter.get("/:contactId", authenticate, isValidId, ctrlWrapper(getById));

contactsRouter.post("/", authenticate, validateBody(addSchema), ctrlWrapper(postNewContact));

contactsRouter.put("/:contactId", authenticate, isValidId, validateBody(addSchema), ctrlWrapper(putContact));

contactsRouter.delete("/:contactId", authenticate, isValidId, ctrlWrapper(deleteContact));

contactsRouter.patch("/:contactId/favorite", authenticate, isValidId, validateBody(contactUpdateFavoriteSchema), ctrlWrapper(updateStatusContact));