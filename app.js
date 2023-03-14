const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});

const homeStartingContent =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis inventore harum omnis cupiditate accusantium molestias! Eum, alias accusamus dolore modi dolorum adipisci iure aut a reiciendis neque non velit ut?";

const aboutViewContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam facere atque, rerum, a soluta aperiam expedita laboriosam dolores, hic nostrum autem error magni porro impedit sapiente ea voluptates? Expedita, fugiat?";

const contactViewContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam facere atque, rerum, a soluta aperiam expedita laboriosam dolores, hic nostrum autem error magni porro impedit sapiente ea voluptates? Expedita, fugiat?";
//Default/Home Route
app.get("/", (req, res) => {
  res.render("home", { homeContent: homeStartingContent });
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
});
