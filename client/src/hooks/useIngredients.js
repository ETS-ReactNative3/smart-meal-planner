import React, { useEffect, useState } from "react";
import axios from "axios";


export default function useIngredients(setList, list) {

  const [ingredientSearchResults, setIngredientSearchResults] = useState([]);
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState({});

  // useEffect(() => {
  //   ingredientSearchResults.forEach((listedIngredient) => {
  //     if (listedIngredient.name === searchTerm) {
  //       console.log("listed ingredient", listedIngredient ,"Term", searchTerm)
  //       setActive(true)
  //     }
  //   })
  //   console.log("Active", active)
  // }, [ingredientSearchResults])

  const searchForIngredient = (term) => {
    console.log("seach")
    axios.get(`/api/search/ingredientTerm`, {
      params: {
        searchTerm: term
      }
    })
      .then((result) => {
        //ingredientSearchResults = result.data.results
        setSearchTerm(term);
        setIngredientSearchResults(result.data.results);
      })
      .then(() => {

        // if the serch term exactly matches one of the ingredient items, we set active to true
        ingredientSearchResults.forEach((listedIngredient) => {
          if (listedIngredient.name === term) {
            setActive(true)
            if (listedIngredient.id) {
              axios.get(`/api/search/ingredientId/${listedIngredient.id}`)
                .then((result) => {
                  setSearchTerm(result.data)
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          }
        })
      })
  };



  const addPantryItem = (result) => {
    // setList((prev) => [...prev, listedIngredient])
    axios.get(`/api/`)
  }

  return { active, searchForIngredient, addPantryItem, ingredientSearchResults, searchTerm };
}