import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";

// components/Topbar.tsx
export default function Topbar() {
  const contactLinks = [
    {
      href: "tel:+1234567890",
      icon: <Phone size={18} />,
      text: "0321333333",
    },
    {
      href: "mailto:bandagestore@gmail.com",
      icon: <Mail size={18} />,
      text: "email:xyz22@gmail.com",
    },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/login",
      icon: <Facebook size={20} />,
    },
    {
      href: "https://twitter.com/login",
      icon: <Twitter size={20} />,
    },
    {
      href: "https://instagram.com/login",
      icon: <Instagram size={20} />,
    },
  ];

  return (
    <div className="bg-gray-800 text-white py-2">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Contact Links */}
        <div className="flex space-x-4">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="flex items-center space-x-2 hover:underline"
            >
              <span className="text-white">{link.icon}</span>
              <span className="text-sm">{link.text}</span>
            </a>
          ))}
        </div>

        {/* Center Text */}
        <div className="text-center text-sm mt-2 sm:mt-0">
          <span>Happy To See You In My Online Store</span>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-2 sm:mt-0 justify-center"> {/* Added justify-center to center the icons */}
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-white hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center">{link.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
