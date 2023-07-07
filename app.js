//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Drug ads appear everywhere in the US, but how do highly promoted new medications stack up against other available treatments? Aside from cost including billions spent on marketing there may also be health implications.";
const aboutContent = "Ringworm is a common, contagious skin infection caused by a fungus. Children can get it from other people who have it or from an infected animal. While it can be itchy and unpleasant, ringworm is usually harmless.";
const contactContent = "A busy schedule can make it challenging to adhere to heart-healthy habits, but there are steps you can take that don't require much time and can fit easily into almost anyone's life";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];
let postUpdate;

app.get("/", function(req, res){
  res.render("home", 
    postUpdate = {
      StartingContent: homeStartingContent,
      posts: posts
  });
});

app.get("/about", function(req, res){
  res.render("about", {about_Description: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contact_Description: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
  
});

app.post("/compose", function(req, res){
  const input = {
    title: req.body.postTitle,
    body: req.body.postBody
  }

  posts.push(input);
  res.redirect("/");
});

app.get("/posts/:newpost", function(req, res){
  let requestedTitle = _.lowerCase(req.params.newpost);

  posts.forEach((post) => {
    let storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      let newPost;
    
      res.render("post", 
      newPost = {
        custom_title: requestedTitle,
        custom_content: post.body
      });
    }
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000")
});
