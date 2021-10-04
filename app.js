const express = require('express');
const app = express();
const itemRoutes = require('./routes/items');
const ExpressError = require('./expressError');

app.use(express.json());
app.use('/items', itemRoutes);

app.use((req, res, next) => {
  const e = new ExpressError('Not Found', 404);
  return next(e);
});
app.use((error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message || 'Something Went Wrong';
  return res.status(status).json({
    error: { message, status },
  });
});
module.exports = app;
