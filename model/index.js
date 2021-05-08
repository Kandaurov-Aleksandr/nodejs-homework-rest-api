const Contact = require('./schema/contacts')

const listContacts = async () => {
  const list = await Contact.find()
  return list
}

const getContactById = async (contactId) => {
  const contactById = await Contact.findOne({ _id: contactId })
  return contactById
}

const removeContact = async (contactId) => {
  const contactToRemove = await Contact.findByIdAndRemove({ _id: contactId })
  return contactToRemove
}

const addContact = async (body) => {
  const addNewContact = await Contact.create(body)
  return addNewContact
}

const updateContact = async (contactId, body) => {
  const contactToUpdate = await Contact.findByIdAndUpdate(
    { _id: contactId },
    body,
    { new: true }
  )
  return contactToUpdate
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
