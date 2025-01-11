import { ContactForm } from './contact-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Contact Us</CardTitle>
              <CardDescription className="text-center">
                Have questions? We're here to help. Send us a message and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

