const express = require('express');
const cors = require('cors');
const diaryRouter = require('./routers/diary');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/diaries', diaryRouter);

module.exports = app
