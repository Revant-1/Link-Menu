import { Check } from 'lucide-react'
import { Button } from "../components/ui/button"

const plans = [
  {
    name: "Basic",
    price: "$10",
    description: "Perfect for small restaurants",
    features: [
      "1 Digital Menu",
      "Basic Customization",
      "QR Code Generation",
      "Menu Analytics",
      "Email Support"
    ]
  },
  {
    name: "Pro",
    price: "$30",
    description: "Ideal for growing businesses",
    features: [
      "3 Digital Menus",
      "Advanced Customization",
      "Multiple Languages",
      "Advanced Analytics",
      "Priority Support",
      "Menu Categories",
      "Special Offers"
    ],
    recommended: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large restaurant chains",
    features: [
      "Unlimited Menus",
      "White-label Solution",
      "API Access",
      "Custom Integration",
      "24/7 Support",
      "Custom Features",
      "Dedicated Manager"
    ]
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best fits your restaurant's needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
                plan.recommended ? 'ring-2 ring-[#006400]' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#006400] text-white px-4 py-1 rounded-full text-sm">
                    Recommended
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-600">/month</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 text-[#006400] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.recommended ? "default" : "outline"}
                  className="w-full"
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

