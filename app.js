const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});

const posts = [];

const homeStartingContent =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis inventore harum omnis cupiditate accusantium molestias! Eum, alias accusamus dolore modi dolorum adipisci iure aut a reiciendis neque non velit ut?";

const aboutViewContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam facere atque, rerum, a soluta aperiam expedita laboriosam dolores, hic nostrum autem error magni porro impedit sapiente ea voluptates? Expedita, fugiat?";

const contactViewContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam facere atque, rerum, a soluta aperiam expedita laboriosam dolores, hic nostrum autem error magni porro impedit sapiente ea voluptates? Expedita, fugiat?";
//Default/Home Route
app.get("/", (req, res) => {
  res.render("home", { homeContent: homeStartingContent, otherContent: posts });
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
  posts.push(postObj);
  res.redirect("/");
});
//
app.get("/post/:postTitle", (req, res) => {
  const postTitle = req.params.postTitle;
  posts.forEach((value, index) => {
    if (_.kebabCase(value.title) === _.kebabCase(postTitle)) {
      res.render("post", {
        Blogtitle: value.title,
        Blogcontent: value.postContent,
      });
      console.log("Match Found");
    } else {
      console.log("Not a match");
    }
  });
});
