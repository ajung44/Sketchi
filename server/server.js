const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if(process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.join(__dirname, '../dist')));

  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
  });

}

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

