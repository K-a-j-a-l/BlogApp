const express = require("express");
const mongoose = require("mongoose");
const articlesRouter = require("./routes/articles");
const Article = require("./models/articles");
const methodOverride = require('method-override')
const app = express()
mongoose.connect("mongodb://localhost:27017/blog")
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.get("/", async(req, res) => {
    const articles = await Article.find().sort({ createdAt: "desc" });
    res.render("articles/index", { articles: articles });
})
app.use("/articles", articlesRouter)

app.listen(5000);