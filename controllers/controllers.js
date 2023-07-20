import { HttpError } from "../helpers/index.js";
import Joi from "joi";

import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} from "../models/contacts.js";

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

export const getAll = async (req, res, next) => {
    try {
        const data = await listContacts();
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const id = req.params.contactId;
        const result = await getContactById(id);
        if (!result) {
            throw HttpError(404, `Contact with Id: ${id} not found`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const postNewContact = async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        if (error) {
        throw HttpError(400, error.message);
        }
        const data = await addContact(req.body);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    const id = req.params.contactId;
    try {
        const result = await removeContact(id);
        if (!result) return HttpError(404, "Not found");
        return res.json({ message: "contact deleted" });
    } catch (error) {
        next(error);
    }
};

export const putContact = async (req, res, next) => {
    const id = req.params.contactId;
    try {
        const { error } = addSchema.validate(req.body);
        if (error) 
            throw HttpError(400, "missing fields");
        const result = await updateContact(id, req.body);
        if (!result) throw HttpError(404, "Not found");
        return res.json(result);
    } catch (error) {
        next(error);
    }
};

