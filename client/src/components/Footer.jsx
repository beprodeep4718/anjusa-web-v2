import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Clock, Palette, PenTool, Frame } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-neutral to-neutral-800 text-neutral-content pt-16 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Gallery Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 font-[playfair-display]">Anjusa Art & Computer Academy</h3>
            <p className="text-neutral-content/80 mb-6 font-[inter]">Curating exceptional artworks and fostering artistic expression since 2008.</p>
            <div className="flex space-x-3">
              {[
                { icon: <Facebook size={18} strokeWidth={1.5} />, href: 'https://facebook.com' },
                { icon: <Twitter size={18} strokeWidth={1.5} />, href: 'https://twitter.com' },
                { icon: <Instagram size={18} strokeWidth={1.5} />, href: 'https://instagram.com' },
                { icon: <Linkedin size={18} strokeWidth={1.5} />, href: 'https://linkedin.com' },
              ].map(({ icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-neutral-content transition"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-[playfair-display] flex items-center">
              <PenTool size={18} className="mr-2" /> Explore
            </h3>
            <ul className="space-y-2 font-[inter]">
              {[
                { name: 'Home', to: '/' },
                { name: 'About Gallery', to: '/about' },
                { name: 'Exhibitions', to: '/exhibitions' },
                { name: 'Featured Artists', to: '/artists' },
                { name: 'Contact', to: '/contact' },
              ].map(({ name, to }, i) => (
                <li key={i}>
                  <Link to={to} className="hover:text-primary transition-colors duration-200">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-[playfair-display] flex items-center">
              <Palette size={18} className="mr-2" /> Collections
            </h3>
            <ul className="space-y-2 font-[inter]">
              {[
                { name: 'Contemporary Art', to: '/collections/contemporary' },
                { name: 'Paintings', to: '/collections/paintings' },
                { name: 'Sculptures', to: '/collections/sculptures' },
                { name: 'Photography', to: '/collections/photography' },
                { name: 'Digital Art', to: '/collections/digital' },
              ].map(({ name, to }, i) => (
                <li key={i}>
                  <Link to={to} className="hover:text-primary transition-colors duration-200">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-[playfair-display] flex items-center">
              <Frame size={18} className="mr-2" /> Visit Us
            </h3>
            <address className="not-italic space-y-3 font-[inter]">
              <p className="flex items-center">
                <MapPin size={16} strokeWidth={1.5} className="mr-2 text-primary" />
                Madhuban P, Rameswarpur P, West Bengal 713409
              </p>
              <p className="flex items-center">
                <Mail size={16} strokeWidth={1.5} className="mr-2 text-primary" />
                ashim.anjusa@gmail.com
              </p>
              <p className="flex items-center">
                <Phone size={16} strokeWidth={1.5} className="mr-2 text-primary" />
                +91 9775550000
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-neutral-content/20 mt-10 pt-6 text-center">
          <p className="text-neutral-content/70 font-[inter] text-sm">
            © {new Date().getFullYear()} Anjusa Gallery. All rights reserved. | A space for artistic expression and appreciation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
