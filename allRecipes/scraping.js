



// module.exports = {
//     getCategories: () => {
//         axios("https://www.allrecipes.com/recipes/")
//             .then(response => {
//                 const html = response.data;
//                 const $ = cheerio.load(html);
//                 const recipesCategories = $('.all-categories-col > section');
//                 const categories = [];
//                 if (!recipesCategories.length && recipesCategories.length <= 0)
//                     return {
//                         'error': 'No Data Found'
//                     };
//                 recipesCategories.each((index, item) => {
//                     const CategoryTitle = $('h3', item).text();
//                     categories.push({
//                         'title': CategoryTitle,
//                         'elements': []
//                     });
//                     const elements = $('li', item);
//                     if (elements.length && elements.length > 0) {
//                         elements.each((i, element) => {
//                             categories[index].elements.push({
//                                 'link': $('a', element).attr('href'),
//                                 'name': $('a', element).text(),
//                             });
//                         });
//                     }
//                     return {
//                         'data': categories
//                     }
//                 });
//             }).catch(err => {
//                 return {
//                     'error': err
//                 };
//             });
//     },
//     getRecipesByCategory: (url, page = null) => {
//         if (page)
//             url = url + '/?page=' + page;
//         axios(url)
//             .then(response => {
//                 const html = response.data;
//                 const $ = cheerio.load(html);
//                 const healthyRecipes = $('.fixed-recipe-card');
//                 const listRecipes = [];
//                 if (healthyRecipes.length && healthyRecipes.length > 0) {
//                     healthyRecipes.each((i, item) => {
//                         const recipeImage = $('img', item).data('original-src');
//                         const recipeUrl = $('a', item).attr('href');
//                         var recipeTitle = $('.fixed-recipe-card__title-link', item)
//                             .text()
//                             .replace('\n                ', '');
//                         recipeTitle = recipeTitle.substring(0, recipeTitle.indexOf('\n'));
//                         listRecipes.push({
//                             recipeImage,
//                             recipeUrl,
//                             recipeTitle
//                         });
//                     });
//                     return {
//                         'data': listRecipes
//                     };
//                 }
//             })
//             .catch(err => {
//                 return {
//                     'error': err
//                 };
//             });
//     },
//     getRecipeContent: (url) => {
//         axios(url)
//             .then(response => {
//                 const html = response.data;
//                 const $ = cheerio.load(html);
//                 const singleRecipeIngredients = $('.ingredients-item-name');
//                 const ingredients = [];
//                 singleRecipeIngredients.each((index, item) => {
//                     var ingredient = $(item).text().replace('\n                                              ', '');
//                     ingredient = ingredient.substring(0, ingredient.indexOf('\n'));
//                     ingredients.push(ingredient);
//                 });
//                 const singleRecipeDirections = $('.instructions-section-item');
//                 const directions = [];
//                 singleRecipeDirections.each((index, item) => {
//                     const direction = $('.section-body > p', item).text();
//                     directions.push(direction);
//                 });

//                 const recipeSummary = $('.recipe-summary > p').text();

//                 const recipeInfos = $('.recipe-meta-item');
//                 const listInfos = [];
//                 recipeInfos.each((index, item) => {
//                     var header = $('.recipe-meta-item-header', item)
//                         .text()
//                         .replace('\n                                        ', '');
//                     header = header.substring(0, header.indexOf('\n'));
//                     if (header.startsWith('  ')) header = header.replace('  ', '').charAt(0).toUpperCase() + header.slice(3);
//                     var value = $('.recipe-meta-item-body', item).text().replace('\n                                        ', '');
//                     value = value.substring(0, value.indexOf('\n'));
//                     if (value.startsWith('  ')) value = value.replace('  ', '')
//                         .charAt(0)
//                         .toUpperCase() + value.slice(3);
//                     const info = {};
//                     info[header] = value;
//                     listInfos.push(info);
//                 });
//                 console.log(summary);
//                 return {
//                     'data': {
//                         'summary': recipeSummary,
//                         'infos': listInfos,
//                         'ingredients': ingredients,
//                         'directions': directions
//                     }
//                 };


//             })
//             .catch(console.error);
//     }
// };