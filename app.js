const axios = require('axios');
const cheerio = require('cheerio');


// ALL RECIPES : HEALTHY RECIPES SCRAPING
// const url = "https://www.allrecipes.com/recipes/84/healthy-recipes/";

// axios(url)
//       .then(response => {
//         const html = response.data;
//         const $ = cheerio.load(html);
//         const healthyRecipes = $('.fixed-recipe-card');
//         const listRecipes = [];
//         if(healthyRecipes.length && healthyRecipes.length > 0){
//             healthyRecipes.each((i, item) => {
//                 const recipeImage = $('img', item).data('original-src');
//                 const recipeUrl = $('a', item).attr('href');
//                 var recipeTitle = $('.fixed-recipe-card__title-link', item)
//                     .text()
//                     .replace('\n                ', '');
//                 recipeTitle = recipeTitle.substring(0, recipeTitle.indexOf('\n'));
//                 listRecipes.push({
//                     recipeImage, recipeUrl, recipeTitle
//                 });
//             });
//         }
//       })
//       .catch(console.error);

// ALL RECIPES : SINGLE RECIPE
      const url = "https://www.allrecipes.com/recipe/8665/braised-balsamic-chicken";

      axios(url)
            .then(response => {
              const html = response.data;
              const $ = cheerio.load(html);
            //   const singleRecipeIngredients = $('.ingredients-item-name');
            //   const ingredients = [];
            //   singleRecipeIngredients.each((index, item) => {
            //       var ingredient = $(item).text().replace('\n                                              ', '');
            //       ingredient = ingredient.substring(0, ingredient.indexOf('\n'));
            //       ingredients.push(ingredient);
            //   });

            //   const singleRecipeDirections = $('.instructions-section-item');
            //   const directions = [];
            //   singleRecipeDirections.each((index, item) => {
            //       const direction = $('.section-body > p', item).text();
            //       directions.push(direction);
            //   });

            // const recipeSummary = $('.recipe-summary > p').text();
            
            const recipeInfos = $('.recipe-meta-item');
            const listInfos = [];
            recipeInfos.each((index, item) => {
                var header = $('.recipe-meta-item-header', item).text().replace('\n                                        ', '');
                header = header.substring(0, header.indexOf('\n'));
                header.startsWith('  ') ? header = header.replace('  ', '').charAt(0).toUpperCase() + header.slice(3) 
                : header = header;
                var value = $('.recipe-meta-item-body', item).text().replace('\n                                          ', '');
                value = value.substring(0, value.indexOf('\n'));
                const info = {};
                info[header] = value;
                listInfos.push(info);
            });

            console.log(listInfos);
            })
            .catch(console.error);