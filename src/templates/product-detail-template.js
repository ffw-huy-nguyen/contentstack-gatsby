import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { jsonToHtml } from "@contentstack/json-rte-serializer";
import ReactHtmlParser from "react-html-parser";

export default function detail(props) {
  const item = props.data.contentstackProduct;
  const htmlValue = jsonToHtml(item.product_details);
  let article_body_elements = new ReactHtmlParser(htmlValue, {
    transform: function transform(node) {
      if (
        node.type === "tag" &&
        node.name === "span" &&
        node.attribs.class_name === "embedded-asset"
      ) {
        console.log(node.attribs);
        if (node.attribs.asset_type == "image/jpeg") {
          return (
            <img src={node.attribs.asset_link} alt={node.attribs.asset_name} />
          );
        } else {
          return <video src={node.attribs.asset_link} controls />;
        }
      }

      return undefined;
    },
  });
  return (
    <>
      <Helmet>
        <title>{item.seo_tags.page_title}</title>
        <meta name="description" content={item.seo_tags.meta_description} />
        <meta name="keywords" content={item.seo_tags.meta_keywords} />
      </Helmet>
      <div className="md:container mx-auto p-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="product-galleries grid grid-cols-3 gap-4 border rounded m-8 p-8">
            {item.galleries.map((gallery) => {
              let media;
              if (gallery.content_type === "image/jpeg") {
                media = <img src={gallery.url} alt={item.title} />;
              } else {
                media = <video src={gallery.url} controls />;
              }
              return (
                <div className="product-gallery" key={gallery.url}>
                  {media}
                </div>
              );
            })}
          </div>
          <div className="product-detail border rounded m-8 p-8">
            <h2 className="product-title text-3xl">{item.title}</h2>
            <div className="product-price">
              <b>Price from: </b>
              {item.number}
            </div>
            <div className="product-price">
              <b>Brand: </b>
              {item.brand[0].title}
            </div>
            <div className="product-price">
              <b>Tag: </b>
              {item.tags.toString()}
            </div>
            <div className="product-price">
              <b>Status: </b>
              {item.status}
            </div>
            <div className="product-variant-price">
              <table className="table-auto border-collapse border border-green-800">
                <thead>
                  <tr>
                    <th className="border border-green-600">Ram</th>
                    <th className="border border-green-600">Rom</th>
                    <th className="border border-green-600">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {item.group.map((price) => {
                    return (
                      <tr key={price.number}>
                        <td className="border border-green-600">{price.ram}</td>
                        <td className="border border-green-600">{price.rom}</td>
                        <td className="border border-green-600">
                          {price.number}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="border rounded m-8 p-8">
          {article_body_elements}
        </div>
      </div>
    </>
  );
}

export const queryDetail = graphql`
  query queryDetail($id: String!) {
    contentstackProduct(id: { eq: $id }) {
      brand {
        title
      }
      galleries {
        url
        content_type
      }
      global_field {
        description
        enable_
        thumbnail {
          url
        }
      }
      group {
        number
        ram
        rom
      }
      id
      product_details {
        type
        uid
        _version
        children {
          type
          uid
          attrs {
            asset_link
            asset_name
            asset_type
            asset_uid
            class_name
            content_type_uid
            display_type
            inline
            src
            type
          }
          children {
            text
            inlineCode
          }
        }
      }
      number
      seo_tags {
        meta_description
        meta_keywords
        page_title
      }
      status
      tags
      title
    }
  }
`;
