process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
let items = require('../fakeDb');
const Item = require('../models');

let candy = { name: 'candy', price: 4.99 };

beforeEach(() => {
  items.push(candy);
});

afterEach(() => {
  items.length = 0;
});

describe('GET /items', () => {
  test('Get All Items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      items: [candy],
    });
  });
});

describe('GET /items/:name', () => {
  test('Get Specific Item', async () => {
    const res = await request(app).get('/items/candy');
    expect(res.statusCode).toBe(200);
  });
  test('Responds with 404 for invalid name', async () => {
    const res = await request(app).get(`/items/invalidname`);
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /items', () => {
  test('Create an item', async () => {
    const res = await request(app).post('/items').send({
      name: 'chicken',
      price: 5.0,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: 'chicken', price: 5.0 } });
  });
  test('Responds with a 400 for an invalid post request', async () => {
    const res = await request(app).post('/items').send({});
    expect(res.statusCode).toBe(400);
  });
});

describe('PATCH /items/:name', () => {
  test('Update an item', async () => {
    const res = await request(app)
      .patch(`/items/${candy.name}`)
      .send({ name: 'candy', price: 4.97 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      updated: { name: 'candy', price: 4.97 },
    });
  });
  test('Responds with a 404 for an invalid item name', async () => {
    const res = await request(app)
      .patch('/items/invalidname')
      .send({ name: 'candy', price: 4.97 });
    expect(res.statusCode).toBe(404);
  });
  test('Responds with a 400 for an invalid item', async () => {
    const res = await request(app).patch(`/items/${candy.name}`).send({});
    expect(res.statusCode).toBe(400);
  });
});

describe('DELETE /items/:name', () => {
  test('Delete an item', async () => {
    const res = await request(app).delete(`/items/${candy.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' });
  });
  test('Responds with a 404 for an invalid item name', async () => {
    const res = await request(app).delete('/items/invalidname');
    expect(res.statusCode).toBe(404);
  });
});
