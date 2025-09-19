function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-xl">🚂</div>
              <span className="font-semibold text-primary">RailWay</span>
            </div>
            <p className="text-sm text-muted">
              Your trusted partner for seamless train travel across the country. Book with confidence, travel with
              comfort.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Book Tickets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Check PNR Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Train Schedule
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Station Info
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted">© 2024 RailWay. All rights reserved. Built with React & Firebase.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
