const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('This database is connected and running');
});

const articlesRouter = require('./routes/articles');
const meetingsRouter = require('./routes/meetings');

app.use('/articles', articlesRouter);
app.use('/meetings', meetingsRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});

