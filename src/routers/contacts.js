import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  updateContactSchema,
  createContactSchema,
} from '../validation/contact.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();
contactsRouter.get('/contacts', ctrlWrapper(getContactsController));
contactsRouter.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactsByIdController),
);
contactsRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
contactsRouter.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
contactsRouter.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);
export default contactsRouter;
