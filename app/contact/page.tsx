"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-gray-700 mb-8">
            Have questions about our services or need assistance? Our team is here to help. Fill out the form and we'll
            get back to you as soon as possible.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-700">support@sautipay.com</p>
                <p className="text-gray-700">sales@sautipay.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-700">+254 700 123 456</p>
                <p className="text-gray-700">+254 733 987 654</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">Office</h3>
                <p className="text-gray-700">
                  Sauti Pay Headquarters
                  <br />
                  Plot 2132, Doctors Lane
                  <br />
                  Kulambiro- Kampala
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-2">Business Hours</h3>
            <p className="text-gray-700">Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p className="text-gray-700">Saturday: 9:00 AM - 1:00 PM</p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-card p-6 rounded-lg border-2 border-green-500 shadow-md"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

