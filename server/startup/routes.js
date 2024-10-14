const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');

const AuthRouter = require('../Routes/authRoutes');

module.exports = function (app) {
  /*   app.set('trust proxy', 1); */

  const allowedOrigins = process.env.NODE_ENV === 'production' ? 
  ['<website domain>'] : 
  ['http://localhost:3000'];

  app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));
  app.use(express.json());
  app.use(cookieParser());

  app.use('/api/auth/', AuthRouter);

};