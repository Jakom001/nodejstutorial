const express = require('express')

const app = express();
app.set("view engine", 'ejs')
app.get("/", (req, res) =>{
    const blogs = [
        {title: "yoshi finds eggs", snippet: "i know how to fry and bloil eggs"},
        {title: "yoshi finds eggs", snippet: "i know how to fry and bloil eggs"},
        {title: "yoshi finds eggs", snippet: "i know how to fry and bloil eggs"},
        {title: "yoshi finds eggs", snippet: "i know how to fry and bloil eggs"},
    ]
    res.render("index", {title: "home", blogs})
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
// listen for request
app.listen(3000)