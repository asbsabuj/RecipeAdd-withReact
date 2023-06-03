import React from "react";
import Ingredients from "./Ingredients";

export default function IngredientsList({ ingredients }) {
  const ingredientList = ingredients.map((ingredient) => {
    return <Ingredients key={ingredient.id} {...ingredient} />;
  });
  return <div className="ingredient-grid">{ingredientList}</div>;
}
