import React from "react";
import { Grid, Typography } from '@mui/material';
import IngredientItem from "./IngredientItem";

const IngredientList = function (props) {
  const { list, listName, setList } = props;
  const listItems = (listDisplay) => {
    return listDisplay.map((item) => {
      let ingredient = item
      return <IngredientItem key={item.id} ingredient={ingredient} listName={listName} list={list} setList={setList} />
    })
  }

  return (
    <>
      <Grid container mt={6}>
        <Grid item xs={4} >
          <Typography sx={{ fontSize: "25px" }}>Item</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography sx={{ fontSize: "25px" }}>Quantity</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: "25px" }}>Units</Typography>
        </Grid>
      </Grid>

      <Grid container mt={2}>
        {listItems(list)}
      </Grid>
    </>
  )
}
export default IngredientList