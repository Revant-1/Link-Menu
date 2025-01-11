import { Smartphone, QrCode, Globe, RefreshCw, Download } from 'lucide-react'

const features = [
  {
    icon: Smartphone,
    title: "Customizable Menus",
    description: "Design your menu with custom branding, colors, and layouts that match your restaurant's style."
  },
  {
    icon: QrCode,
    title: "QR Integration",
    description: "Generate unique QR codes for each menu that customers can scan with their smartphones."
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Offer your menu in multiple languages to cater to diverse customers."
  },
  {
    icon: RefreshCw,
    title: "Easy Updates",
    description: "Update prices, items, and specials in real-time without reprinting menus."
  },
  {
    icon: Download,
    title: "No App Required",
    description: "Customers can view your menu instantly without downloading any apps."
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for Digital Menus
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features to help you create and manage your digital menu with ease
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <feature.icon className="h-12 w-12 text-[#006400] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

