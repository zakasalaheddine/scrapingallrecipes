const fetch = require('node-fetch');
const cheerio = require('cheerio');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');


module.exports = {
    loadData: async url => {
        const res = await fetch(url);
        return res.text();
    },
    getCategories: async html => {
        try {
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
                        // console.log(new Category(sectionName, categoryName, categoryUrl));
                        categories.push(new Category(sectionName, categoryName, categoryUrl));
                    });
                }
            });
            return Promise.resolve(categories);
        } catch (err) {
            console.error(err);
        }

    },
    getRecipesFromCategory: async (selectedCategory, page = null) => {
        try {
            let url = selectedCategory.url;
            if (page)
                url += '/?page=' + page;
            const html = await module.exports.loadData(url);
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
                    title: recipeTitle
                        .trim(),
                    url: recipeUrl
                });
            });
            return Promise.resolve(listRecipes);
        } catch (err) {
            throw err;
        }
    },
    getRecipeInfos: async ({image, title, url}) => {
        try {
            const html = await module.exports.loadData(url);
            const $ = await cheerio.load(html);
            const singleRecipeIngredients = await $('.checkList__line');
            const ingredients = [];
            await singleRecipeIngredients.map(async (index, item) => {
                const ingredient = await $('label', item).attr('title');
                if(ingredient)
                    ingredients.push(ingredient);
            });
            const singleRecipeDirections = $('li[class="step"]');
            console.log(singleRecipeDirections.length);
            const directions = [];
            await singleRecipeDirections.map(async (index, item) => {
                const direction = await $('.section-body > p', item).text();
                console.log(direction);
                directions.push(direction);
            });
            console.log(directions)
            const recipeSummary = await $('.recipe-summary > p').text();
            const recipeInfos = await $('.recipe-meta-item');
            const listInfos = [];
            recipeInfos.map(async (index, item) => {
                const header = await $('.recipe-meta-item-header', item)
                    .text().trim();
                const value = await $('.recipe-meta-item-body', item).text().trim();
                const info = {
                    header,
                    value
                };
                listInfos.push(info);
            });
            Promise.resolve(new Recipe(url, title, recipeSummary, listInfos, ingredients, directions));
        } catch (err) {
            throw err;
        }
    }
};