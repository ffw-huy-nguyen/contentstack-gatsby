const path = require("path");
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Create products list
  const result = await graphql(
    `
      {
        allContentstackProduct {
          nodes {
            id
            title
            status
            tags
            brand {
              title
            }
            global_field {
              thumbnail {
                url
              }
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const products = result.data.allContentstackProduct.nodes;


  products.forEach(product => {
   
    createPage({
      path: `/product/${product.id}`,
      component: path.resolve("./src/templates/product-detail-template.js"),
      context: {
        id: product.id,
      },
    })
  })

 
};

