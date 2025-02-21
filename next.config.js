//module.exports = {
 // images: {
    //domains: ['cdn.sanity.io'],
 // },
//};


/** //type {import('next').NextConfig} */
//const nextConfig = {
  //reactStrictMode: true, // Enforces React best practices during development

 // images: {
   // remotePatterns: [
     // {
       // protocol: "https",
        //hostname: "cdn.sanity.io", // Allow images from Sanity.io CDN
        //pathname: "/images/**", // Match all image paths under /images/
     // },
    //],
  //},

  // Add any other configurations here (e.g., redirects, headers, etc.)
//};

//module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  // Routing configuration
  rewrites: async () => {
    return [
      {
        source: "/products/:id",
        destination: "/products/[id]",
      },
    ];
  },
};

module.exports = nextConfig;
