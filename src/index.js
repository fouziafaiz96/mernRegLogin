const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
require("./db/conn");
const Student = require("./models/registers");
const path = require("path");
console.log(__dirname);
// const staticPath = path.join(__dirname, "../public");
app.set("view engine", "hbs");
const viewsPath = path.join(__dirname, "../views");
app.set("views", viewsPath);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(partialPath));
app.get("/register", (req, res) => {
  res.render("reg");
});
app.post("/register", (req, res) => {
  try {
    console.log(req.body);
    const studentRecord = new Student(req.body);
    studentRecord
      .save()
      .then(() => {
        res.status(201).send(studentRecord);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  try {
    email = req.body.email;
    password = req.body.password;
    console.log("email is:", email);
    const usermail = await Student.findOne({ email, password });
    res.send(usermail);
    console.log(usermail);
  } catch (e) {
    res.send("invalid email");
  }
});
app.listen(port, () => {
  console.log(`SERVER IS RUNNING AT PORT ${port}`);
});
