const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db('lesson2')
    .collection('contacts')
    .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('lesson2')
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res, next) => {
  const {firstName, lastName, email, favoriteColor, birthday} = req.body
  const contact = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    favoriteColor: favoriteColor,
    birthday: birthday
  }
  const response = await mongodb
    .getDb()
    .db('lesson2')
    .collection('contacts')
    .insertOne(contact)
  response.acknowledged
    ? res.status(201).send() 
    : res.status(500).json(response.error || 'An error occurred while creating the contact')
};

const updateContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const {firstName, lastName, email, favoriteColor, birthday} = req.body
  const contact = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    favoriteColor: favoriteColor,
    birthday: birthday
  }
  const response = await mongodb
    .getDb()
    .db('lesson2')
    .collection('contacts')
    .replaceOne({_id: userId}, contact)
  response.modifiedCount > 0 
    ? res.status(204).send() 
    : res.status(500).json(response.error || 'An error occurred while updating the contact')
};

const deleteContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('lesson2')
    .collection('contacts')
    .deleteOne({_id: userId})
  response.acknowledged
    ? res.status(200).send() 
    : res.status(500).json(response.error || 'An error occurred while deleting the contact')
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
