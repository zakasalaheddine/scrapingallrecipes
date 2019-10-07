const fetch = require('node-fetch');
const cheerio = require('cheerio');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');


module.exports = {
    loadData: async url => {
        const res = await fetch(url);
        return res.text();
    },
    getCategories: async () => {
        try {
            const res = await fetch('https://www.allrecipes.com/recipes/');
            const html = await res.text();
            const $ = await cheerio.load(html);
            const sections = $('.all-categories-col > section');
            if (!sections.length || sections.length <= 0)
                throw 'No Data Found';
            const categories = [];
            sections.map(async (index, section) => {
                const sectionName = await $('h3', section).text().replace(' ', '');
                const elements = await $('li', section);
                if (elements.length && elements.length > 0) {
                    elements.map(async (index, element) => {
                        const categoryName = await $('a', element).text();
                        const categoryUrl = await $('a', element).attr('href');
                        categories.push(new Category(sectionName, categoryName, categoryUrl));
                    });
                }
            });
            return Promise.resolve(categories);
        } catch (err) {
            console.error(err);
        }

    },
    getRecipesFromCategory: async (categoryURL, page = null) => {
        try {
            let url = categoryURL;
            if (page)
                url += '/?page=' + page;
            const res = await fetch(url);
            const html = await res.text();
            const $ = await cheerio.load(html);
            const recipes = await $('.fixed-recipe-card');
            if (!recipes.length || recipes.length <= 0)
                throw 'No Data';
            const listRecipes = [];
            recipes.map(async (index, recipe) => {
                const recipeImage = await $('.fixed-recipe-card__img', recipe).data('original-src');
                const recipeUrl = await $('a', recipe).attr('href');
                let recipeTitle = await $('a > span[class="fixed-recipe-card__title-link"]', recipe)
                    .text();
                listRecipes.push({
                    image: recipeImage,
                    name: recipeTitle
                        .trim(),
                    url: recipeUrl
                });
            });
            return Promise.resolve(listRecipes);
        } catch (err) {
            throw err;
        }
    },
    getRecipeInfos: async (url, title) => {
        try {
            const res = await fetch(url);
            const html = await res.text();
            const $ = await cheerio.load(html);
            const singleRecipeIngredients = await $('.checkList__line');
            const ingredients = [];
            await singleRecipeIngredients.map(async (index, item) => {
                const ingredient = await $('label', item).attr('title');
                if (ingredient)
                    ingredients.push(ingredient);
            });
            const singleRecipeDirections = $('li[class="step"]');
            const directions = [];
            await singleRecipeDirections.map(async (index, item) => {
                const direction = await $('.recipe-directions__list--item', item).text().trim();
                if (direction)
                    directions.push(direction);
            });
            const recipeSummary = await $('.submitter__description').text();
            const timeToMake = await $('.ready-in-time').text();
            const servingCount = await $('#metaRecipeServings').attr('content');
            const cals = await $('.calorie-count').attr('aria-label');

            const listInfos = {
                timeToMake,
                serving: servingCount + ' servings',
                cals,
            };
            return Promise.resolve(new Recipe(url, title, recipeSummary, listInfos, ingredients, directions));
        } catch (err) {
            throw err;
        }
    }
};