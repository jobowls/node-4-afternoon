require("dotenv").config();

const express = require('express'),
      session = require('express-session'),
      checkForSession = require("./middlewares/checkForSession"),
      swagCtrl = require("./controllers/swagCtrl"),
      authCtrl = require('./controllers/authCtrl'),
      cartCtrl = require('./controllers/cartCtrl'),
      searchCtrl = require('./controllers/searchCtrl');

const app = express();

let {SERVER_PORT, SESSION_SECRET} = process.env;

app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
);

app.use(checkForSession);
app.use(express.static(`${_dirname}/../build`));

app.post("/api/register", authCtrl.register);
app.post("/api/login", authCtrl.login);
app.post("/api/signout", authCtrl.signout);
app.get("/api/user", authCtrl.getUser);

app.get("/api/swag", swagCtrl.read);

app.post("/api/cart/checkout", cartCtrl.checkout);
app.post("/api/cart/:id", cartCtrl.add);
app.delete("/api/cart/:id", cartCtrl.delete);

app.get("/api/search", searchCtrl.search);

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
});