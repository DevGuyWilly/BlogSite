const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});

// LOCAL CONNECTION
mongoose
  .connect("mongodb://localhost:27017/blogPost", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Succesful"));

// CREATE SCHEMA FOR POST
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const postDB = mongoose.model("post", postSchema);
//
const posts = [];

const homeStartingContent =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis inventore harum omnis cupiditate accusantium molestias! Eum, alias accusamus dolore modi dolorum adipisci iure aut a reiciendis neque non velit ut?";

const aboutViewContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam facere atque, rerum, a soluta aperiam expedita laboriosam dolores, hic nostrum autem error magni porro impedit sapiente ea voluptates? Expedita, fugiat?";

const contactViewContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam facere atque, rerum, a soluta aperiam expedita laboriosam dolores, hic nostrum autem error magni porro impedit sapiente ea voluptates? Expedita, fugiat?";
//Default/Home Route
app.get("/", (req, res) => {
  postDB.find({}).then((foundItems) => {
    res.render("home", {
      homeContent: homeStartingContent,
      otherContent: foundItems,
    });
  });
});
//About Route
app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutViewContent });
});
//Contact Route
app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactViewContent });
});
//Compose Route (GET)
app.get("/compose", (req, res) => {
  res.render("compose");
});
// Compose Route (POST)
app.post("/compose", (req, res) => {
  const title = req.body.titleContent;
  const post = req.body.mainContent;
  const postObj = {
    title: title,
    postContent: post,
  };
  postDB.insertMany(new postDB({ title: title, content: post }));
  posts.push(postObj);
  res.redirect("/");
});
//
app.get("/post/:postTitle", (req, res) => {
  const postTitle = req.params.postTitle;
  postDB.findOne({}).then((foundItems) => {
    if (_.kebabCase(foundItems.title) === _.kebabCase(postTitle)) {
      res.render("post", {
        Blogtitle: foundItems.title,
        Blogcontent: foundItems.content,
      });
      console.log("Match Found");
    } else {
      console.log("Not a Match!");
    }
  });
});
