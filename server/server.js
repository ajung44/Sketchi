const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const router = require('./router')

const MONGO_URI = 'mongodb+srv://AndrewJung1:72J7zUDXXwBZ98sQ@cluster0.vzm2e.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'sketchi'
})
  .then(() => console.log('Connected to database'))
  .catch(error => console.log(error));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));


if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.join(__dirname, '../dist')));

  app.get('/', (req, res) => {
    console.log('received');
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
  });

}

app.get('/browse', (req, res) => {
  console.log('here');
  return res.status(200).sendFile(path.join(__dirname, '../browser.html'));
});

app.use('/user', router);

app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error Handler caught',
    status: 400,
    message: { err: 'An error occured' },
  };
  const errorObj= Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => console.log('listening...'));

