const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "Customer successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
    
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;
    return res.send(JSON.stringify(books[isbn],null,4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  //Write your code here
  const author = req.params.author;
  let i = 0;
    do {
    const iterbooks= books[i];
    i++;
    } while (books[i].author != author);
  //return res.status(300).json({message: "Yet to be implemented"});
  //return res.send(JSON.stringify(books[author],null,4))
  //return res.send(Object.keys(books))
  return res.send("books by author:" + JSON.stringify(books[i],null,4))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let i = 0;
    do {
    const iterbooks= books[i];
    i++;
    } while (books[i].title != title);
  //return res.status(300).json({message: "Yet to be implemented"});
  //return res.send(JSON.stringify(books[author],null,4))
  //return res.send(Object.keys(books))
  return res.send("books by title:" + JSON.stringify(books[i],null,4))
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  //return res.send("books by review:" + JSON.stringify(books[isbn].review,null,4))
  return res.send(books[isbn].reviews)
});

module.exports.general = public_users;
