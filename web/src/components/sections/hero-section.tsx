import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Users, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-blue-950/20 dark:via-sky-950/20 dark:to-cyan-950/20" />

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-sky-100 px-4 py-2 text-sm font-medium text-blue-800 dark:from-blue-900/50 dark:to-sky-900/50 dark:text-blue-200">
            <Zap className="mr-2 h-4 w-4" />
            Save 22% on electricity costs
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-100 dark:to-white">
              Solar Energy
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-xl text-muted-foreground lg:text-2xl max-w-3xl mx-auto">
            Transparent solar energy billing for apartment buildings. Democratize clean energy access and simplify tenant energy management.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="h-14 px-8 bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white text-lg">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="h-14 px-8 text-lg">
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>4.9/5 from 200+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>20+ active projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}