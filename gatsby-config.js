module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "My Gatsby Site",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-source-contentstack`,
      options: {
        // Required: API Key is a unique key assigned to each stack.
        api_key: process.env.CONTENTSTACK_API_KEY,
  
        // Required: Delivery Token is a read-only credential. 
        delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
        
        // Required: Environment where you published your data.
        environment: process.env.CONTENTSTACK_ENVIRONMENT,
  
        // Optional: CDN set this to point to other cdn end point. For eg: https://eu-cdn.contentstack.com/v3 
        // cdn: `cdn_url`,
  
        // Optional: expediteBuild set this to either true or false
        // expediteBuild: `boolean_value`,
  
        // Optional: Specify true if you want to generate custom schema
        // enableSchemaGeneration : `boolean_value`,
  
        // Optional: Specify a different prefix for types. This is useful in cases where you have multiple instances of the plugin to be connected to different stacks.
        // type_prefix: `Contentstack`, // (default)
  
        // Optional: Specify true if you want to download all your contentstack images locally
        // downloadImages: `boolean_value`
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
