export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Contact Us with Your Menu",
      description: "Fill out the contact form and send us your menu items, descriptions, prices, and photos."
    },
    {
      number: "02",
      title: "We Create Your Digital Menu",
      description: "We take your menu details and create a professional, mobile-friendly digital menu for your restaurant."
    },
    {
      number: "03",
      title: "Customers Scan & Explore",
      description: "Customers scan the QR code to instantly access your digital menu on their smartphones and place orders."
    }
  ];
  
  
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with digital menus in three simple steps
            </p>
          </div>
  
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#006400] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {step.number}
                </div>
                <div className="pt-8">
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  