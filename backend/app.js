const express = require('express');
const cors = require('cors');
//const firebase = require('firebase');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  //build page 404
  next(new Error('Page Not Found'));
});

app.use((err, req, res, next) => {
  res.status(500).json({error: err.error});
});
app.listen(process.env.PORT || 3000, () => console.log('Server is running in port ' + process.env.PORT || 3000));
