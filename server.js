// CONSTANTS
const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// APP SETUP
app.use(express.static(path.join(__dirname, "public")));
// EJS SETUP
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// CHECK STATE
app.listen(port);
console.log("Running on http://localhost:" + port);


// MAIN ROUTES
app.get("/", (req, res) => {
    console.log("Sent visualizer.");
    res.status(200).render("visualizer", {layout: "layouts/default", title: "Traceroute Visualizer"});
});