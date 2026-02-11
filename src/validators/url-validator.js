const { body } = require('express-validator');

exports.createShortUrlValidator = [
  body('originalUrl')
    .notEmpty()
    .withMessage('originalUrl is required')
    .isURL({ protocols: ['http','https'], require_protocol: true })
    .withMessage('Only http:// and https:// URLs are allowed'),

  body('customAlias')
    .optional()
    .isLength({ min: 4, max: 15 })
    .withMessage('Alias must be 4-15 characters')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Alias must be alphanumeric'),

  body('expiresAt')
    .optional()
    .isISO8601()
    .withMessage('expiresAt must be a valid date')
];
