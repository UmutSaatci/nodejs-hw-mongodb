import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone Number should be a string',
    'string.min': 'Phone Number should have at least {#limit} characters',
    'string.max': 'Phone Number should have at most {#limit} characters',
    'any.required': 'Phone Number is required',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.base': 'E-mail should be a string',
    'string.min': 'E-mail should have at least {#limit} characters',
    'string.max': 'E-mail should have at most {#limit} characters',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  isFavourite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.min': 'Name should have at least {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  isFavourite: Joi.boolean(),
});
