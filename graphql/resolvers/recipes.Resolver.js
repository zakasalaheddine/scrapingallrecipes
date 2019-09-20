const Recipe = require('../../models/Recipe');
const allRecipes = require('../../allRecipes/scraping');

const RecipesResolver = {
    getRecipeInfo: async ({ url, name }) => {
        
        console.log(url);
        try {
            const res = allRecipes.getRecipeContent(url);
            console.log(res);
            // const newRecipe = await new Recipe(url, name);
            // return newRecipe;
        } catch (err) {
            throw err;
        }

    }
};

module.exports = RecipesResolver ;