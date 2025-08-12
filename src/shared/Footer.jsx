import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 text-white dark:text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold mb-4">Safe Travel</h2>
            <p className="text-sm opacity-80 mb-4 text-center md:text-left">
              Maintained by Brainstation23 PLC
            </p>
            <p className="text-sm opacity-80 text-center md:text-left">
              Your trusted partner for seamless and secure travel experiences worldwide.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <a
                  href="/about"
                  className="text-white dark:text-gray-200 hover:text-yellow-300 dark:hover:text-yellow-400 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-white dark:text-gray-200 hover:text-yellow-300 dark:hover:text-yellow-400 transition-colors duration-200"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white dark:text-gray-200 hover:text-yellow-300 dark:hover:text-yellow-400 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-white dark:text-gray-200 hover:text-yellow-300 dark:hover:text-yellow-400 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://facebook.com"
                className="p-2 rounded-full bg-white/10 dark:bg-gray-700/50 hover:bg-yellow-300 dark:hover:bg-yellow-400 hover:text-indigo-600 dark:hover:text-gray-900 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="p-2 rounded-full bg-white/10 dark:bg-gray-700/50 hover:bg-yellow-300 dark:hover:bg-yellow-400 hover:text-indigo-600 dark:hover:text-gray-900 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                className="p-2 rounded-full bg-white/10 dark:bg-gray-700/50 hover:bg-yellow-300 dark:hover:bg-yellow-400 hover:text-indigo-600 dark:hover:text-gray-900 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="p-2 rounded-full bg-white/10 dark:bg-gray-700/50 hover:bg-yellow-300 dark:hover:bg-yellow-400 hover:text-indigo-600 dark:hover:text-gray-900 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm opacity-80 text-center md:text-left">
              Email: support@safetravel.com
            </p>
            <p className="text-sm opacity-80 text-center md:text-left">
              Phone: +123-456-7890
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/20 dark:border-gray-700/50 text-center">
          <p className="text-sm opacity-80">
            &copy; {new Date().getFullYear()} Safe Travel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;