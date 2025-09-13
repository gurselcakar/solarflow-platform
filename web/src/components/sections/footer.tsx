import Link from "next/link"
import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              SolarFlow
            </span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <Link
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Support
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 SolarFlow. Built for Solar4All Hackathon - Democratizing clean energy access.</p>
        </div>
      </div>
    </footer>
  )
}