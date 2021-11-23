import { Autocomplete, Grid, Typography, TextField, Card, CardMedia, CardHeader } from "@mui/material";
import {React, useState, useEffect} from "react";
import RecipeCarousel from "./RecipeCarousel";
import RecipeSearchItem from "./RecipeSearchItem";
const axios = require('axios');

const testRecipies = {
  "results": [
      {
          "id": "633876",
          "title": "Baked Ziti",
          "image": "https://spoonacular.com/recipeImages/633876-312x231.jpg",
          "imageType": "jpg"
      },
      {
          "id": 648279,
          "title": "Italian Tuna Pasta",
          "image": "https://spoonacular.com/recipeImages/648279-312x231.jpg",
          "imageType": "jpg"
      },
      {
          "id": 633883,
          "title": "Baked Ziti Casserole",
          "image": "https://spoonacular.com/recipeImages/633883-312x231.jpg",
          "imageType": "jpg"
      },
      {
          "id": 632781,
          "title": "Arugula & Feta Pasta",
          "image": "https://spoonacular.com/recipeImages/632781-312x231.jpg",
          "imageType": "jpg"
      },
      {
          "id": 633884,
          "title": "Baked Ziti Or Rigatoni",
          "image": "https://spoonacular.com/recipeImages/633884-312x231.jpg",
          "imageType": "jpg"
      },
      {
          "id": 637591,
          "title": "Cheese Tortellini Alfredo",
          "image": "https://spoonacular.com/recipeImages/637591-312x231.jpg",
          "imageType": "jpg"
      },
      {
          "id": 644885,
          "title": "Gluten Free Vegan Gnocchi",
          "image": "https://spoonacular.com/recipeImages/644885-312x231.jpg",
          "imageType": "jpg"
      },
      {
          "id": 633752,
          "title": "Baked Ravioli & Meat Sauce",
          "image": "https://spoonacular.com/recipeImages/633752-312x231.jpg",
          "imageType": "jpg"
      },
      {
          "id": 654928,
          "title": "Pasta With Italian Sausage",
          "image": "https://spoonacular.com/recipeImages/654928-312x231.jpg",
          "imageType": "jpg"
      },
      {
          "id": 649718,
          "title": "Lemon Pasta Alfredo (Vegan)",
          "image": "https://spoonacular.com/recipeImages/649718-312x231.jpg",
          "imageType": "jpg"
      }
  ],
  "offset": 0,
  "number": 10,
  "totalResults": 31
};



const RecipeSearch = function(props) {

  const [recipes, setRecipes] = useState(testRecipies.results);
  const [searchTextValue, setSearchTextValue] = useState("");
  const [renderStatus, setRenderStatus] = useState(false);

  let recipeContents = [];

  useEffect(() => {

    axios({
      method: 'get',
      url: 'http://localhost:8080/api/recipes',
      data: {
        searchTerm: searchTextValue
      }
    }).
    then((result)=>{
      setRecipes(()=>{
        return result.data.results;
      })
    })
    .then(()=>{

      setRenderStatus(() => {
        return true
      })

    })   
    .then(()=>{

      if(renderStatus){
        recipeContents = recipes.map((recipe) => {
          return <RecipeSearchItem recipe={recipe} />;
        })
      }
      console.log(recipeContents)
    })
    
    .catch(
      function (error) {
        console.log(error)
      }
    )
  }, [searchTextValue]);

  return (
    <Grid container justifyContent="center">
      <Typography variant="h3">
          Recipies
      </Typography>
      <TextField onChange={(event) => {setSearchTextValue(event.target.value)}}></TextField>
      <Grid container justifyContent="center" spacing={2} >
        { 
          recipeContents
        }
      </Grid>
      <Grid container>
        {/* <RecipeCarousel testRecipies={testRecipies}/>
        <RecipeCarousel testRecipies={testRecipies}/> */}
      </Grid>
    </Grid>
  )
}

export default RecipeSearch;