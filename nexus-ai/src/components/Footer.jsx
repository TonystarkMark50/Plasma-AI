import React from 'react';
import { Cube16Solid, Link as LinkIcon } from '../assets/svgs';

const productLinks = ['Features', 'Pricing', 'Integrations', 'Changelog', 'Status'];
const companyLinks = ['About', 'Blog', 'Careers', 'Press', 'Legal'];
const connectLinks = ['Twitter', 'GitHub', 'LinkedIn', 'Discord'];

export default function Footer() {
  return (
    <div className="container py-16 sm:py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div>
          <a href="#" className="flex items-center gap-2 mb-4" aria-label="Nexus AI home">
            <Cube16Solid className="w-6 h-6 text-forsythia" />
            <span className="font-display text-base font-bold">
              <span className="text-forsythia">NEXUS</span>
              <span className="text-arctic-powder">AI</span>
            </span>
          </a>
          <p className="text-sm text-mystic-mint/60 leading-relaxed mb-4">
            Intelligent data automation platform for modern engineering teams.
          </p>
          <p className="text-xs text-mystic-mint/40">
            &copy; {new Date().getFullYear()} Nexus AI. All rights reserved.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold text-arctic-powder mb-4">Product</h4>
          <nav aria-label="Footer navigation">
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 text-sm text-mystic-mint/70 hover:text-forsythia transition-colors duration-150"
                  >
                    <LinkIcon className="w-3 h-3 flex-shrink-0" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold text-arctic-powder mb-4">Company</h4>
          <ul className="space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="flex items-center gap-1.5 text-sm text-mystic-mint/70 hover:text-forsythia transition-colors duration-150"
                >
                  <LinkIcon className="w-3 h-3 flex-shrink-0" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold text-arctic-powder mb-4">Connect</h4>
          <ul className="space-y-2.5">
            {connectLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="flex items-center gap-1.5 text-sm text-mystic-mint/70 hover:text-forsythia transition-colors duration-150"
                >
                  <LinkIcon className="w-3 h-3 flex-shrink-0" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
