import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../css/app.css";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
//import SearchBar from "./SearchBar";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "learnreact.key";

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipe);

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    const recipeJSON = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log("render get");
    if (recipeJSON) setRecipes(recipeJSON);
  }, []);

  useEffect(() => {
    console.log("render");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const recipeContextValue = {
    handleRecipesAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  function handleRecipesAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      cookTime: "",
      Servings: 1,
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: "",
        },
      ],
    };
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeChange(id, recipe) {
    const newRecipe = [...recipes];
    const index = newRecipe.findIndex((r) => r.id === id);
    newRecipe[index] = recipe;
    setRecipes(newRecipe);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  // function handleFilterBySearch(e) {
  //   const searchRecipe = [...recipes];
  //   if (e.target.value !== "") {
  //     const results = searchRecipe.filter((recipe) => {
  //       return recipe.name.toLowerCase().includes(e.target.value.toLowerCase());
  //     });
  //     setRecipes(results);
  //   }
  //   if (e.target.value === "") return setRecipes(searchRecipe);
  // }

  return (
    <>
      <RecipeContext.Provider value={recipeContextValue}>
        {/* <SearchBar handleFilterBySearch={handleFilterBySearch} />*/}

        <RecipeList recipes={recipes} />
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
      </RecipeContext.Provider>
    </>
  );
}

const sampleRecipe = [
  {
    id: 1,
    name: "Plain Chicken",
    cookTime: "1.45",
    Servings: 3,
    instructions: "1. put chicken out\n2. put salt\n3. cook well\n4. eat",
    ingredients: [
      {
        id: 1,
        name: "chicken",
        amount: "2 pound",
      },
      {
        id: 2,
        name: "salt",
        amount: "1tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Pork Masala",
    cookTime: "2.30",
    Servings: 4,
    instructions: "1. pork in the oven\n2. put salt\n3. cook well\n4. eat",
    ingredients: [
      {
        id: 1,
        name: "pork",
        amount: "3 pound",
      },
      {
        id: 2,
        name: "paprika",
        amount: "2tbs",
      },
    ],
  },
];

export default App;
