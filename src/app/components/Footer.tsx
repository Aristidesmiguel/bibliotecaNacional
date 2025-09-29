import { Link } from "react-router-dom";
import {
  BookOpen,
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold">Meridian Library</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Sua porta de entrada para o conhecimento e a inspiração. Descubra,
              explore e cresça com nossa extensa coleção de livros e recursos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/catalog"
                  className="hover:text-accent transition-colors"
                >
                  Browse Catalog
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Events & Programs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Digital Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Membership
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Research Assistance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Interlibrary Loans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Study Rooms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Computer Access
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Printing & Copying
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span>
                  123 Literary Avenue
                  <br />
                  Knowledge District
                  <br />
                  Booktown, BK 12345
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <span>+1 (555) LIBRARY</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <span>info@meridianlibrary.org</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-primary-foreground/20">
              <p className="text-sm font-semibold mb-1">Library Hours</p>
              <p className="text-xs text-primary-foreground/80">
                Mon-Fri: 9:00 AM - 8:00 PM
              </p>
              <p className="text-xs text-primary-foreground/80">
                Sat-Sun: 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/80">
          <p>© 2024 Meridian Library. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
