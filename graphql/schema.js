const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type RecipeInfos{
        title: String!
        value: String!
    }

    type Recipe{
        name: String!
        url: String!
        summary: String
        infos: [RecipeInfos!]!
        ingredients: [String!]!
        directions: [String!]!
    }


    type Query {
        getRecipeInfo(url: String!, name: String!): Recipe
    }

    schema{
        query: Query
    }
`);