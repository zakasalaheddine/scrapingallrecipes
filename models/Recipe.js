const allRecipes = require('../allRecipes/scraping');

const Recipe = class Recipe {
    constructor(url, name){
        
        this.url = url;
        this.name = name;
        this.fillRecipe();

    }
    async fillRecipe(){
        try {
            const response = allRecipes.getRecipeContent(this.url);
            console.log(response);
            // this.summary = response.data.summary;
            // this.infos = response.data.listInfos;
            // this.ingredients = response.data.ingredients;
            // this.directions = response.data.directions;
        } catch (err) {
            throw err;
        }
        
    }
};

module.exports = Recipe;