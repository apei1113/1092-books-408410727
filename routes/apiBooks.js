const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async function (req, res, next) {
    // let data;
    try {
      // const [rows] = await db.query('SELECT * FROM dbdemo.books ORDER BY id desc');
      // const [rows] = await db.query('SELECT * FROM `0521`.w15 ORDER BY id desc');
      // const [rows] = await db.query('SELECT * FROM `0521`.books_copy ORDER BY ClassName desc'); //不撈SQL的資料

      const response = await fetch('http://localhost:1337/Assignments');
      const data = await response.json();

      res.render('apiBooks/index', { data });
    } catch (err) {
      console.log('Errors on getting books!');
      res.render('apiBooks/index', { data: '' });
    }
  });

// display add book page
router.get('/add', async function (req, res, next) {
  // res.send('display add book page')
  res.render('apiBooks/add', {
    // name: '',
    // author: '',
    ClassName: '',
    HW_Name: '',
    HW_Grade: '',
  });
});
  
module.exports = router;