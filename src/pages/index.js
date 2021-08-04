import React from "react";
import { graphql, Link } from "gatsby";

export default function IndexPage({ data }) {
  console.log(data);
  const products = data.allContentstackProduct.nodes;
  return (
    <div className="md:container mx-auto">
      <h1>Products</h1>
      <div className="flex flex-row">
        {products.map((product) => {
          return (
            <div
              className="product p-4 m-4 border shadow-lg rounded-xl"
              key={product.id}
            >
              <div className="product-image mb-8">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.global_field.thumbnail.url}
                    alt={product.title}
                  />
                </Link>
              </div>
              <div className="product-name text-3xl text-center">
                <Link to={`/product/${product.id}`}>{product.title}</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const query = graphql`
  query HomePageQuery {
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
`;
