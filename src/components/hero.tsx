'use client'

import { Button } from "../components/ui/button"
import { QrCode, ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Transform Your Menu into a Digital Experience!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create QR code-based digital menus that delight your customers and make menu management effortless.
            </p>
           
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
         <div className="relative z-10">
  <iframe
    src="https://qwickmenu.site/demo"
    title="Menu Preview"
    className="mx-auto w-full h-[600px] rounded-3xl shadow-2xl"
  ></iframe>
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute -right-8 -top-8 bg-white p-4 rounded-xl shadow-lg"
  >
    <QrCode className="h-16 w-16 text-[#006400]" />
  </motion.div>
</div>

            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

