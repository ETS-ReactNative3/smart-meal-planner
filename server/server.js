// load .env data into process.env
const environment = require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

const morgan = require("morgan");
app.use(morgan("dev"));

//cookie parser to get login id
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// add database query functions here
const { generateGroceryList, getRecipesByUser, getGroceryListByUser, editGroceryList, deleteGroceryList, getUserDetails, addGroceryListItem, deleteRecipesForUser, addRecipesForUser, deleteGroceryListItem, getPantryByUser, deletePantryItem, editPantryItem, addPantryItem, generateJoke, getFavourites, addFavourites, deleteFavourites } = require("./db/database");

const db = { generateGroceryList, getRecipesByUser, getGroceryListByUser, editGroceryList, deleteGroceryList, getUserDetails, addGroceryListItem, deleteRecipesForUser, addRecipesForUser, deleteGroceryListItem, getPantryByUser, deletePantryItem, editPantryItem, addPantryItem, generateJoke, getFavourites, addFavourites, deleteFavourites };

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const recipesRoutes = require("./routes/recipes");
const pantryRoutes = require("./routes/pantry");
const groceryList = require("./routes/groceryList");
const suggestions = require("./routes/suggestions");
const search = require("./routes/search");
const payment = require("./routes/payment");

// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/api/recipes", recipesRoutes(db));
app.use("/api/pantry", pantryRoutes(db));
app.use("/api/grocery_list", groceryList(db));
app.use("/api/suggestions", suggestions(db));
app.use("/api/search", search(db));
app.use("/api/payment", payment(db));

app.listen(PORT, () => {
  console.log(`Fork it Over listening on port ${PORT}`);
});
