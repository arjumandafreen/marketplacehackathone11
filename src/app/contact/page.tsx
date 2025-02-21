
// Importing required icons from react-icons
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import img1 from '../components/images/cont99.png';

const stats = [
  { count: '2.7K', label: 'Users' },
  { count: '1.8K', label: 'Subscribes' },
  { count: '35', label: 'Downloads' },
  { count: '4', label: 'Products' },
];

const contactCards = [
  {
    icon: <FaMapMarkerAlt size={48} className="mb-4 mx-auto" />,
    title: 'Location',
    description: 'KARACHI.',
    bgColor: 'bg-gray-100',
  },
  {
    icon: <FaPhoneAlt size={48} className="mb-4 mx-auto" />,
    title: 'Phone',
    description: '+1234567890 .',
    bgColor: 'bg-black-100',
  },
  {
    icon: <FaEnvelope size={48} className="mb-4 mx-auto" />,
    title: 'Email',
    description: 'xyz22@gmail.com',
    bgColor: 'bg-gray-100',
  },
];

export default function StatsSection() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        {/* Stats Section */}
        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
          <div className="w-full sm:p-4 px-4 mb-6">
            <h1 className="font-bold text-6xl">OUR CONNECTIONS</h1>
            <h1 className="title-font font-medium text-xl mb-2 text-gray-900">
              Luna tag window-crasher zealot scraps auteur.
            </h1>
            <div className="leading-relaxed">
              Slow-drip artisan ale pup sipping kombucha raw-edge bistro, synthesizer minimal eco-friendly mustache trendcrowd
            </div>
          </div>
          {stats.map((stat, index) => (
            <div key={index} className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
              <h2 className="title-font font-medium text-3xl text-gray-900">{stat.count}</h2>
              <p className="leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Image on the Right */}
        <div className="lg:w-1/2 sm:w-1/3 w-full mt-6 sm:mt-0">
          <Image 
            src={img1}
            alt="Example"
            className="w-full h-auto rounded-lg"
            width={500}
            height={400}
          />
        </div>

        {/* Contact Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {contactCards.map((card, index) => (
            <div key={index} className={`${card.bgColor} p-6 rounded-lg text-center`}>
              {card.icon}
              <h3 className="font-medium text-xl text-blue-900">{card.title}</h3>
              <p className="leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Button at the Bottom */}
        <div className="w-full mt-6 text-center">
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all">
            <p>UI/UX DESIGN WEBSITE COMPLETE</p>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
