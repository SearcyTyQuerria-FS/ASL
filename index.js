// Load in our Express framework
const express = require(`express`);

// Create a new Express instance called "app"
const app = express();

// Load in our RESTful routers
const routers = require("./routers/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set up TwigJS as view engine
app.set("view engine", "twig");
app.set("views", "./views");

// Home page welcome middleware
app.get("/", (req, res) => {
  res.status(200).render("index");
});

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet);
app.use(`/stars`, routers.star);
app.use(`/galaxies`, routers.galaxy);

// I moved the port because I have something running on 3000
app.listen(3000);
