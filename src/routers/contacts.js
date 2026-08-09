import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
} from '../controllers/contacts.js';

const contactsRouter = Router();
contactsRouter.get('/contacts', getContactsController);
contactsRouter.get('/contacts/:contactId', getContactsByIdController);

export default contactsRouter;
