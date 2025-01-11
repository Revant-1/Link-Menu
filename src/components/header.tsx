import { useState, useEffect } from 'react';
// import { Button } from '../components/ui/button'; // Adjust the import path as needed
import { QrCode, Menu, X } from 'lucide-react';
import { scrollToSection } from '../utils/scroll'; // Adjust the import path as needed

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-2">
            <QrCode className="h-8 w-8 text-[#006400]" />
            <span className="text-xl font-bold text-[#006400]">QwickMenu</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Features', 'Testimonials', 'FAQ', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-600 hover:text-[#006400] transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

        

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg">
            <div className="px-4 py-2 space-y-2">
              {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-600 hover:text-[#006400]"
                >
                  {item}
                </button>
              ))}
              
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
