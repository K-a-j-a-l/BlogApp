const express = require("express");
const mongoose = require("mongoose");
const articlesRouter = require("./routes/articles");
const Article = require("./models/articles");
const app = express()
mongoose.connect("mongodb://localhost:27017/blog")
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/articles", articlesRouter)

app.get("/", async(req, res) => {
    const articles = await Article.find().sort({ createdAt: "desc" });
    res.render("articles/index", { articles: articles });
})

app.listen(5000);