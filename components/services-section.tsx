import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, RefreshCw, BarChart3 } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      title: "Travel Insurance Processing",
      description: "Streamline your travel insurance claims and processing with our advanced fintech solutions.",
      icon: <Plane className="h-10 w-10 text-[#003366] dark:text-blue-400 mb-2" />,
    },
    {
      title: "Refund Management",
      description: "Efficiently handle refunds and chargebacks, ensuring customer satisfaction and financial accuracy.",
      icon: <RefreshCw className="h-10 w-10 text-[#003366] dark:text-blue-400 mb-2" />,
    },
    {
      title: "Commission Management",
      description: "Automate and optimize your commission structures for travel agents and partners.",
      icon: <BarChart3 className="h-10 w-10 text-[#003366] dark:text-blue-400 mb-2" />,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="services">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter mb-4 text-[#003366] dark:text-white">Our Services</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-[700px] mx-auto">
            Comprehensive travel finance solutions designed for modern businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="border bg-white dark:bg-gray-900 transition-all duration-200 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800"
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto">{service.icon}</div>
                <CardTitle className="text-[#003366] dark:text-blue-300">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-center">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
