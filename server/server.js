const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const port = process.env.PORT || 5000;

const dotenv = require("dotenv");

// get config vars
dotenv.config();

//allows for the parsing of request bodies
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

/*** Session handling
 * A session is created on every request, but whether or not it is saved depends on the option flags provided ******/
const session = require("express-session");
app.use(
  session({
    secret: "our hardcoded secret", // later we will define the session secret as an environment variable for production. for now, we'll just hardcode it.
    cookie: {
      // the session cookie sent, containing the session id.
      maxAge: 24 * 60 * 60 * 1000, //24 hour expiry
      rolling: true,
      httpOnly: true,
    },
    secure: false,
    // Session saving options
    saveUninitialized: false, // don't save the initial session if the session object is unmodified (for example, we didn't log in).
    resave: false, // don't resave an session that hasn't been modified.
  })
);

//serve react build
const buildPath = path.join(__dirname, "", "build");
app.use(express.static(buildPath));
app.use("/static", express.static(path.join(__dirname, "build/static")));


//import router object
const router = require("./routes/routes");
app.use(router);

app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "build/") });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

module.exports = { app };
