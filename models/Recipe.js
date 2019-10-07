
const Recipe = class Recipe {
    constructor(url, name, summary, infos, ingredients, directions, images){
        this.url = url;
        this.name = name;
        this.summary = summary;
        this.infos = infos;
        this.ingredients = ingredients;
        this.directions = directions;
        this.images = images;
    }
};

module.exports = Recipe;