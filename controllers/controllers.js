import Contact from "../models/contacts.js";

import { HttpError } from "../helpers/index.js";
import { addSchema, contactUpdateFavoriteSchema } from "../helpers/index.js";

export const getAll = async (req, res) => {
    const result = await Contact.find({});
    res.json(result);
};

export const getById = async (req, res) => {
    const id = req.params.contactId;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, `Contact with Id: ${id} not found`);
    }
    res.json(result);
};

export const postNewContact = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const data = await Contact.create(req.body);
    res.status(201).json(data);
};

export const deleteContact = async (req, res) => {
    const id = req.params.contactId;
        const result = await Contact.deleteOne({ _id: id });
        if (!result) return HttpError(404, "Not found");
        return res.json({ message: "contact deleted" });
};

export const putContact = async (req, res) => {
    const id = req.params.contactId;
        const { error } = addSchema.validate(req.body);
        if (error) 
            throw HttpError(400, "missing fields");
        const result = await Contact.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        });
        if (!result) throw HttpError(404, "Not found");
        return res.json(result);
};

export const updateStatusContact = async (req, res) => {
    const id = req.params.contactId;
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    const result = await Contact.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (error) throw HttpError(400, "missing field favorite");
    return res.json(result);
};