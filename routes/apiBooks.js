const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async function (req, res, next) {
    // let data;
    try {
      
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
    
    ClassName: '',
    HW_Name: '',
    HW_Grade: '',
  });
});
  

// add a new book
router.post('/add', async function (req, res, next) {
  // res.send('Add a new book.')

  const ClassName = req.body.ClassName;
  const HW_Name = req.body.HW_Name;
  const HW_Grade = req.body.HW_Grade;

  // console.log(name, author);
  console.log(ClassName, HW_Name, HW_Grade);

  const form_data = {
    ClassName: ClassName,
    HW_Name: HW_Name,
    HW_Grade: HW_Grade,
  };
  
  try {
    // await db.query('INSERT INTO `0521`.books_copy SET ?', form_data);
 
    const response = await fetch('http://localhost:1337/Assignments', {
        method: 'post',
        body:    JSON.stringify(form_data),
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    res.redirect('/apiBooks');
  } catch(err) {
    console.log(err);
    res.render('apiBooks/add', {
      // name: form_data.name,
      // author: form_data.author
      ClassName: form_data.ClassName,
      HW_Name: form_data.HW_Name,
      HW_Grade: form_data.HW_Grade
    });
  }
});

// display edit book page
// router.get('/edit/:id', async function (req, res, next) {
  router.get('/edit/:id', async function (req, res, next) {
    // res.send('display edit book page');
    const id = req.params.id;
    // const ClassName = req.params.ClassName;
    try {
      const response = await fetch(`http://localhost:1337/Assignments/${id}`);
      const data = await response.json();
      
      res.render('apiBooks/edit', {
        id: data.id,
        // name: rows[0].name,
        // author: rows[0].author
        ClassName: data.ClassName,
        HW_Name: data.HW_Name,
        HW_Grade: data.HW_Grade
      });
    } catch(err) {
      console.log(err);
    }
  });

router.post('/update', async function (req, res, next) {
  // res.send('update book data');
  // const name = req.body.name;
  // const author = req.body.author;
  const ClassName = req.body.ClassName;
  const HW_Name = req.body.HW_Name;
  const HW_Grade = req.body.HW_Grade;
  const id = req.body.id;

  const form_data = {
    ClassName: ClassName,
    HW_Name: HW_Name,
    HW_Grade: HW_Grade,
  };

  try {

    const response = await fetch(`http://localhost:1337/Assignments/${id}`, {
        method: 'put',
        body:    JSON.stringify(form_data),
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    res.redirect('/apiBooks');
  } catch(err){
    console.log(err);
  }
});

router.get('/delete/:id', async function (req, res, next) {
    // router.get('/delete/:ClassName', async function (req, res, next) {
    let id = req.params.id;
    // let ClassName = req.params.ClassName;
  
    try {
      
      const response = await fetch(`http://localhost:1337/Assignments/${id}`, {
        method: 'delete'
      });

    const data = await response.json();

    res.redirect('/apiBooks');

    } catch (err) {
      console.log(err);
    }
    res.redirect('/books');
  });

module.exports = router;