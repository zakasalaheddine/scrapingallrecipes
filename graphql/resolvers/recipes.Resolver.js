const Recipe = require('../../models/Recipe');
const allRecipes = require('../../helpers/allRecipes');

const RecipesResolver = {
    getRecipeInfo: async ({ url, title }) => {
        
        try {
            const res = await allRecipes.getRecipeInfos(url, title);
            return res;
        } catch (err) {
            throw err;
        }

    },
    getCategories: async () => {
        try {
            const res = await allRecipes.getCategories();
            return res;
        } catch (err) {
            throw err;
        }
    },
    getRecipesByCategory: async ({ url, page }) => {
        try {
            const res = await allRecipes.getRecipesFromCategory(url, page);
            return res;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = RecipesResolver ;