
require('dotenv').config();

const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//const SECRET_KEY = "MY_SECRET_KEY_123";
const SECRET_KEY = process.env.JWT_SECRET;

const port = 5000


app.use(cors())
app.use(express.json())
app.use('/images', express.static('images'))

const db = mysql.createConnection({   // XAMPP 
  host: "localhost",
  user: "root",
  password: "",     
  database: "booklibrary"
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

app.post("/register", async (req, res) => {

 const { user_name, email, password } = req.body;
 const hash = await bcrypt.hash(password, 10);

 db.query("INSERT INTO users (user_name,email,password) VALUES (?,?,?)",[user_name, email, hash],
  (err, result) => {
    if(err){
      console.log(err);
      res.send(err);
    }else{
      res.send("REGISTER SUCCESS");
    }
  }
 );
});

app.post("/login", (req,res)=>{
   const { email, password } = req.body;

 db.query("SELECT * FROM users WHERE email=?",[email],
  async (err,result)=>{

    if(result.length === 0){
      return res.send({login:false});
    }

    const user = result[0];
    const match = await bcrypt.compare(password,user.password);

    if(match){
        // สร้าง JWT
        const token = jwt.sign(
          {
            user_id: user.user_id,   
            email: user.email
          },
            SECRET_KEY,
          { expiresIn:"1d" }
        );
          res.send({
            login:true,
            token:token,
            user:{
              user_id:user.user_id,    
              user_name:user.user_name,
              email:user.email
            }
      });

    }else{
      res.send({login:false});
    }
  }
 );
});

//Middleware ตรวจ Token
  const verifyToken = (req,res,next)=>{
  const header = req.headers["authorization"];

  if(!header){
    return res.status(401).send("No Token");
  }

  const token = header.split(" ")[1];

    jwt.verify(token, SECRET_KEY,(err,decoded)=>{

   if(err){
     return res.status(401).send("Token Expired");
   }
   req.user = decoded;
   next();
 });
};

app.get("/search", (req,res)=>{

  const keyword = req.query.keyword;
  const sql = `SELECT books.*, users.user_name FROM books JOIN users ON books.user_id = users.user_id
    WHERE
      title LIKE ?
      OR author LIKE ?
      OR category LIKE ?
      OR description LIKE ?
  `;

  const search = `%${keyword}%`;

  db.query(sql,[search,search,search,search],(err,result)=>{
      res.send(result);
  });

});

const upload = multer({ storage: storage })

  app.get('/booklist', (req, res) => {
      db.query(`SELECT books.*, users.user_name FROM books JOIN users ON books.user_id = users.user_id`,
    (err, result) => {
      res.send(result);
    });
});

app.post('/create',verifyToken, upload.single('image'), (req,res)=>{

  const user_id = req.user.user_id; //  ได้จาก JWT

  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const published_year = req.body.published_year;
  const category = req.body.category;
  const image = req.file ? req.file.filename : null;

  db.query("INSERT INTO books (title,author,description,published_year,category,image,user_id) VALUES (?,?,?,?,?,?,?)",
    [title,author,description,published_year,category,image,user_id],
    (err,result)=>{
      if(err){
        console.log(err);
        res.send(err);
      }else{
        res.send("INSERT SUCCESS");
      }
    }
  );
});

app.put('/update/:id', verifyToken, upload.single('image'), (req, res) => {

  const book_id = req.params.id;
  const user_id = req.user.user_id; //  คนที่ login

  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const published_year = req.body.published_year;
  const category = req.body.category;

  let sql;
  let values;

  if (req.file) {

    const image = req.file.filename;
      sql = `UPDATE books SET title=?, author=?, description=?, published_year=?, category=?, image=? WHERE book_id=? AND user_id=?`;   
      values = [title,author,description,published_year,category,image,book_id,user_id];

  } else {

    sql = `UPDATE books SET title=?, author=?, description=?, published_year=?, category=? WHERE book_id=? AND user_id=?`;
    values = [ title,author,description,published_year,category, book_id,user_id];
  }

    db.query(sql, values, (err, result) => {

    if(result.affectedRows === 0){
      return res.status(403).send("You are not owner");
    }
    res.send("UPDATE SUCCESS");
  });

});


app.delete('/delete/:id',verifyToken,(req,res)=>{

  const book_id = req.params.id;
  const user_id = req.user.user_id;

  db.query("DELETE FROM books WHERE book_id=? AND user_id=?",[book_id,user_id],
    (err,result)=>{
      if(result.affectedRows === 0){
        return res.status(403).send("You are not owner");
      }
      res.send("DELETE SUCCESS");
    }
  );
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})