const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const items = require('../fakeDb');
const Item = require('../models');

router.get('/', (req, res, next) => {
  try {
    return res.json({ items: Item.findAll() });
  } catch (e) {
    return next(e);
  }
});

router.get('/:name', (req, res, next) => {
  try {
    const foundItem = Item.find(req.params.name);
    if (!foundItem) {
      throw new ExpressError('Item not found', 404);
    }
    return res.json(foundItem);
  } catch (e) {
    next(e);
  }
});

router.post('/', (req, res, next) => {
  try {
    if (!req.body.name || !req.body.price) {
      throw new ExpressError('Name and Price required', 400);
    }
    const newItem = new Item(req.body.name, req.body.price);
    res.status(201).json({ added: newItem });
  } catch (e) {
    return next(e);
  }
});

router.patch('/:name', (req, res, next) => {
  try {
    if (!req.body.name || !req.body.price) {
      throw new ExpressError('Name and Price required', 400);
    }
    const updatedItem = Item.update(
      req.params.name,
      req.body.name,
      req.body.price
    );
    if (!updatedItem) {
      throw new ExpressError('Item not found', 404);
    }
    return res.json({
      updated: { name: req.body.name, price: req.body.price },
    });
  } catch (e) {
    next(e);
  }
});

router.delete('/:name', (req, res, next) => {
  try {
    const foundItem = Item.find(req.params.name);
    if (!foundItem) {
      throw new ExpressError('Item not found', 404);
    }
    const deleteItem = Item.delete(req.params.name);
    return res.json({ message: 'Deleted' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
