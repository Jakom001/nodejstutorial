const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

const app = express();
app.set("view engine", 'ejs')

mongoose.connect("mongodb://localhost:27017/node-tuts")
.then((result) => (
    console.log("Databse connected"),
    app.listen(3000)))
.catch((err) => console.log(err))
// middle ware static files
app.use(express.static('public'))

app.use(morgan('tiny'))
app.use((req, res, next) =>{
    console.log("new reuest made");
    console.log("host: ", req.hostname);
    console.log("path: ", req.path);
    console.log("method: ", req.method);
    next()
})

app.use((req, res, next) =>{
    console.log("in the next middle ware")
    next()
})

// Routes
app.get("/add-blog", async (req, res) =>{
    const blog =  new Blog({
        title: "new Blog 2",
        snippet: "about my new blog",
        body: "reading js today"
    })
   await  blog.save()
   .then(result => {
    res.send(result);
   })
})

app.get("/all-blogs", (req, res) =>{
    Blog.find()
    .then(result => {
        res.send(result);

    }).catch ((err) => {
        console.error(err)
    })
})

app.get("/single-blog", (req,res) =>{
    Blog.findById("6739fa20a028faa679e80f20")
    .then(result => {
        res.send(result)
    })
})

app.get("/", (req, res) =>{
    res.redirect("/blogs")
})
// Blog Routes
app.get("/blogs", (req, res) =>{
    Blog.find().sort({createdAt: -1})
    .then((result) =>{
        res.render('index', {title: "All Blogs", blogs: result})
    }).catch((err) =>{
        console.log(err)
    })
})
app.get("/about", (req, res) =>{
    res.render("about", {title: "about"})
})

app.get('/blogs/create/', (req, res) =>{
    res.render('create', {title: "Create new blog"})
})

// 404 page
app.use((req, res) => {
    res.status(404).render("404", {title: "404"})
})
