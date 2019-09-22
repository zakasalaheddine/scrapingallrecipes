const express = require('express');
const graphqlHttp = require('express-graphql');

const graphQlSchema = require('./graphql/schema');
const RecipesResolver = require('./graphql/resolvers/recipes.Resolver');

const allRecipesScrap = require('./helpers/allRecipes');




const app = express();
const port = 3000;

app.get('/test', async (req, res) => {
    try {
        // const html = await allRecipesScrap.loadData("https://www.allrecipes.com/recipes/");
        // const categories = await allRecipesScrap.getCategories(html);
        // const recipes = await allRecipesScrap.getRecipesFromCategory({
        //     section: "MealType",
        //     name: "Breakfast and Brunch",
        //     url: "https://www.allrecipes.com/recipes/78/breakfast-and-brunch/"
        // }, 3);
        const recipe = await allRecipesScrap.getRecipeInfos({
            image: "https://images.media-allrecipes.com/userphotos/300x300/633609.jpg",
            title: "Whole Grain Waffles",
            url: "https://www.allrecipes.com/recipe/88309/whole-grain-waffles/"
            });
        res.send(recipe);
    } catch (err) {
        console.error(err);
    }
});

app.use(
    '/graphql',
    graphqlHttp({
        schema: graphQlSchema,
        rootValue: RecipesResolver,
        graphiql: true
    })
);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));