const express = require('express');
const router = express.Router();

router.get('/', async function (req, res, next) {
    let data;
    try {
      // const [rows] = await db.query('SELECT * FROM dbdemo.books ORDER BY id desc');
      // const [rows] = await db.query('SELECT * FROM `0521`.w15 ORDER BY id desc');
      const [rows] = await db.query('SELECT * FROM `0521`.books_copy ORDER BY ClassName desc');
      data = rows;
      // res.json(data);
      res.render('books', { data });
    } catch (err) {
      console.log('Errors on getting books!');
      res.render('books', { data: '' });
    }
  });

module.exports = router;