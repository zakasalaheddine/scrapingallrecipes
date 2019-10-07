const express = require('express');
const graphqlHttp = require('express-graphql');

const graphQlSchema = require('./graphql/schema');
const RecipesResolver = require('./graphql/resolvers/recipes.Resolver');




const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        res.send('HELLO WORLD');
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