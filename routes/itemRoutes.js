const express = require('express');
const router= express.Router();

const {getItem, createItem, updateItem, deleteItem}= require('../controllers/itemController.js');

router.route('/')
.get(getItem)
.post(createItem);

router.route('/')
.put(updateItem)
.delete(deleteItem);

module.exports= router;
