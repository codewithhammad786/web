const legoData = require("./modules/legoSets");
const path = require("path");
const express = require("express");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/lego/sets", async (req, res) => {
  try {
    let sets;
    if (req.query.theme) {
      sets = await legoData.getSetsByTheme(req.query.theme);
    } else {
      sets = await legoData.getAllSets();
    }
    res.render("sets", { sets });
  } catch (err) {
    res.status(404).send(err);
  }
});

app.get("/lego/sets/:num", async (req, res) => {
  try {
    let set = await legoData.getSetByNum(req.params.num);
    res.render("setDetails", { set });
  } catch (err) {
    res.status(404).send(err);
  }
});

app.get("/lego/sets/:num", async (req, res) => {
  try {
    let set = await legoData.getSetByNum(req.params.num);
    res.render("setDetails", { set });
  } catch (err) {
    res.status(404).send(err);
  }
});


app.use((req, res, next) => {
  res.status(404).render("404");
});

legoData.initialize().then(() => {
  app.listen(HTTP_PORT, () => {
    console.log(`server listening on: ${HTTP_PORT}`);
  });
});
