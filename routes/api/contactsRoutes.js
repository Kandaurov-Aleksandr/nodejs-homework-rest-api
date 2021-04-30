const passport = require('passport');
const passportJWT = require('passport-jwt');

const dotenv = require('dotenv');
dotenv.config();

const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} = require('../../controllers/contacts');

const express = require('express');
const { checkAuthTokenMiddleware } = require('../../contactAuth/middleware');
const router = express.Router();

const bodyJSON = express.json();

router.get('/', checkAuthTokenMiddleware, getContacts);
router.get('/:contactId', checkAuthTokenMiddleware, getContactById);
router.post('/', bodyJSON, checkAuthTokenMiddleware, createContact);
router.delete('/:contactId', checkAuthTokenMiddleware, deleteContact);
router.patch('/:contactId', bodyJSON, checkAuthTokenMiddleware, updateContact);

module.exports = router;