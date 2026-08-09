import createHttpError from 'http-errors';
import { getAllContacts, getContactByID } from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts({});

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

export const getContactsByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactByID(contactId);

    if (!contact) {
      // 2. Hata oluşturup ayarlıyoruz
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};
