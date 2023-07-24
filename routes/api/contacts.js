import express from "express";
import {
  getAll,
  getById,
  postNewContact,
  putContact,
  deleteContact,
  updateStatusContact,
} from "../../controllers/controllers.js";

import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import { isValidId } from "../../middlewares/IsValidId.js";

const contactsRouter = express.Router()

contactsRouter.get("/", ctrlWrapper(getAll));

contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getById));

contactsRouter.post("/", ctrlWrapper(postNewContact));

contactsRouter.put("/:contactId", isValidId, ctrlWrapper(putContact));

contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(deleteContact));

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  ctrlWrapper(updateStatusContact)
);

export default contactsRouter;