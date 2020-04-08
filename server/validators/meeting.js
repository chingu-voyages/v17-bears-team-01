const Joi = require('@hapi/joi');

module.exports = meetingValidator = Joi.object({
  author: Joi.string(),
  title: Joi.string().min(3).max(20),
  description: Joi.string().max(50).allow(''),
  duration: Joi.number().max(180),
  timezone: Joi.string(),
  availability: Joi.array().items(Joi.number()),
  participants: Joi.array().items(Joi.string().email().max(50)),
  intervals: Joi.array().items(Joi.number())
}); 