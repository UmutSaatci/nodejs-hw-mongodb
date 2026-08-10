import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();
contactsRouter.get('/contacts', ctrlWrapper(getContactsController));
contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactsByIdController),
);
contactsRouter.post('/contacts', ctrlWrapper(createContactController));
contactsRouter.patch(
  '/contacts/:contactId',
  ctrlWrapper(patchContactController),
);
contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactController),
);
export default contactsRouter;
