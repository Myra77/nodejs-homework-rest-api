import Contact from "../models/contacts.js";

import { HttpError } from "../helpers/index.js";
import { addSchema, contactUpdateFavoriteSchema } from "../helpers/index.js";

export const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { favorite, page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    if (favorite) {
        const result = await Contact.find({ owner, favorite: true }).populate(
        "name email phone favorite"
        );
        return res.json(result);
    }
    const result = await Contact.find({ owner }, "", { skip, limit }).populate(
        "name email phone favorite"
    );
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
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

export const deleteContact = async (req, res) => {
    const id = req.params.contactId;
        const result = await Contact.deleteOne({ _id: id });
        if (!result) return HttpError(404, "Not found");
        return res.json({ message: "contact deleted" });
};

export const putContact = async (req, res) => {
    const id = req.params.contactId;
    const result = await Contact.findOneAndUpdate({ _id: id }, req.body, {
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