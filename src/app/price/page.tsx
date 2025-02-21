import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Basic access to all features",
      "Limited product updates",
      "Community support",
    ],
    buttonText: "Try for Free",
    buttonClass: "bg-blue-500 text-white hover:bg-blue-600",
    backgroundClass: "bg-white",
    priceClass: "text-blue-500",
  },
  {
    name: "Standard",
    price: "$9.99",
    features: [
      "Endless access to every feature",
      "Continuous product updates",
      "Assistance via email",
    ],
    buttonText: "Begin Your Journey",
    buttonClass: "bg-green-500 hover:bg-green-600",
    backgroundClass: "bg-gray-800 text-white",
    priceClass: "",
  },
  {
    name: "Premium",
    price: "$19.99",
    features: [
      "Complete Core Features",
      "Premium Assistance",
      "Personalized account manager",
    ],
    buttonText: "Subscribe",
    buttonClass: "bg-blue-500 text-white hover:bg-blue-600",
    backgroundClass: "bg-white",
    priceClass: "text-blue-500",
  },
];

export default function PricingSection() {
  return (
    <section className="bg-gray-100 py-16 px-4">
      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Easy-to-Understand Pricing</h2>
        <p className="text-gray-600 mb-8">Select a plan tailored to your requirements.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`${plan.backgroundClass} rounded-lg shadow-lg p-6`}>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{plan.name}</h3>
              <p className={`text-4xl font-bold ${plan.priceClass} mb-6`}>{plan.price}</p>
              <ul className="text-gray-600 space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button className={`w-full py-2 rounded-lg ${plan.buttonClass} transition`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Paragraph Section */}
      <div className="max-w-7xl mx-auto my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Pricing Inquiries</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt orci sit amet enim tempor, eget congue purus bibendum.
          </p>
          <p className="text-gray-700">
            No hassle. Sed ut perspiciatis unde omnis iste natus error sit voluptatem. Praesent euismod tortor at neque accumsan, sed tempus nunc feugiat.
          </p>
          <p className="text-gray-700">
            Curabitur at eros ut neque viverra tempor. Integer vehicula nisi ac nisi auctor, ac malesuada urna auctor. Vestibulum pharetra turpis ac turpis tempor auctor.
          </p>
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Pricing FAQs</h2>
          <p className="text-gray-700">
            Nullam euismod leo et sem ultrices, vitae convallis augue lacinia. Cras ullamcorper dolor at lectus faucibus, et sollicitudin purus fermentum.
          </p>
          <p className="text-gray-700">
            Donec placerat purus at metus egestas, ac condimentum ligula egestas. Nulla euismod dui at tortor hendrerit, sed facilisis risus venenatis.
          </p>
          <p className="text-gray-700">
            Donec a risus sit amet ipsum scelerisque luctus non ut tortor.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Begin Your 14-Day Trial</h1>
        <p className="text-lg text-gray-800 mb-4">Still have questions? Reach out to our support team.</p>
        <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition mb-4">
          Get in Touch with Support
        </button>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 transition text-2xl"
          >
            <FaFacebook />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition text-2xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-700 transition text-2xl"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </section>
  );
}
