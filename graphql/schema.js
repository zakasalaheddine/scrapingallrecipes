const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type RecipeInfos{
        timeToMake: String
        serving: String
        cals: String
    }

    type Recipe{
        name: String
        url: String!
        images: [String]
        summary: String
        infos: RecipeInfos
        ingredients: [String]
        directions: [String]
    }

    type Category {
        section: String!
        name: String!
        url: String!
    }


    type Query {
        getRecipeInfo(url: String!, title: String!): Recipe
        getCategories : [Category]
        getRecipesByCategory(url: String!, page: Int) : [Recipe]
    }

    schema{
        query: Query
    }
`);