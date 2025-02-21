import React from "react";

const Footer = () => {
  const sections = [
    {
      title: "Company Info",
      links: ["About Us", "Careers", "We are Hiring", "Blog"],
    },
    {
      title: "Legal",
      links: ["Terms of Service", "Privacy Policy", "Disclaimer"],
    },
    {
      title: "Features",
      links: ["Business Marketing", "User Analytics", "Live Chat", "Unlimited Support"],
    },
    {
      title: "Resources",
      links: ["iOS & Android", "Watch a Demo", "Customers", "API"],
    },
  ];

  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold">{section.title}</h3>
              <ul className="mt-4 text-sm space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:underline">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold">Get In Touch</h3>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Subscribe
              </button>
              <p className="text-sm mt-2 text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-300 pt-6 text-center">
          <p className="text-sm">
            Made in Pakistan | All Rights Reserved © 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
