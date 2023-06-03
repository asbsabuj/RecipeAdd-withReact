import React, { useContext } from "react";
import IngredientsList from "./IngredientsList";
import { RecipeContext } from "./App";

export default function Recipe(props) {
  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);
  const { id, name, cookTime, Servings, instructions, ingredients } = props;
  return (
    <div className="recipe">
      <div className="recipe__header">
        <h3 className="recipe__title">{name}</h3>

        <div>
          <button
            className="btn btn--primary mr-1"
            onClick={() => handleRecipeSelect(id)}
          >
            Edit
          </button>
          <button
            className="btn btn--danger"
            onClick={() => handleRecipeDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Cook time : </span>
        <span className="recipe__value">{cookTime}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Servings : </span>
        <span className="recipe__value">{Servings}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Instructions : </span>
        <div className="recipe__value  recipe__instructions recipe__value--indented ">
          {instructions}
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Ingredients:</span>
        <div className="recipe__value recipe__value--indented ">
          <IngredientsList ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
}
