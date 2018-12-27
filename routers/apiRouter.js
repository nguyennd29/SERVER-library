const express = require('express');
const ApiRouter = express.Router();
const UserRouter = require('./UserRouter');
const AuthRouter = require('./AuthRouter');
const BookRouter = require('./BookRouter');
const RecommendRouter = require('./RecommendRouter');
const SearchRouter = require('./SearchRouter');


ApiRouter.use('/auth', AuthRouter);
ApiRouter.use('/user', UserRouter);
ApiRouter.use('/recommend', RecommendRouter);
ApiRouter.use('/book', BookRouter);
ApiRouter.use('/search', SearchRouter);

module.exports = ApiRouter;
