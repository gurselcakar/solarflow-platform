import { TrendingUp, Shield, Users, Zap, CheckCircle, Star } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "22% Cost Savings",
    description: "PV electricity at €0.26/kWh vs €0.3351/kWh grid rates. Clear savings breakdown for every tenant.",
    gradient: "from-blue-400 to-sky-500"
  },
  {
    icon: Shield,
    title: "German Compliance",
    description: "Full EnWG compliance built-in. Automated legal-compliant invoicing reduces complexity.",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    icon: Users,
    title: "Dual Interface",
    description: "Landlord dashboard for property management. Tenant portal for personal energy insights.",
    gradient: "from-green-400 to-green-600"
  },
  {
    icon: Zap,
    title: "Real-time Analytics",
    description: "15-minute interval smart meter integration with live consumption and production tracking.",
    gradient: "from-purple-400 to-purple-600"
  },
  {
    icon: CheckCircle,
    title: "Transparent Billing",
    description: "Visual breakdown of every kWh: solar vs. grid sources with clear cost calculations.",
    gradient: "from-red-400 to-red-600"
  },
  {
    icon: Star,
    title: "Modern UX",
    description: "Ultra-modern interface with light/dark themes. Energy bills as clear as mobile phone bills.",
    gradient: "from-indigo-400 to-indigo-600"
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Why Choose SolarFlow?
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for German energy regulations with full transparency and modern user experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border bg-background p-8 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}