
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserMenu from "@/components/UserMenu";

const ExpandableHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gold-600">
            تئاتر آنلاین
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link to="/" className="text-foreground hover:text-gold-600 transition-colors">
              صفحه اصلی
            </Link>
            <Link to="/wall" className="text-foreground hover:text-gold-600 transition-colors">
              دیوار گفتگو
            </Link>
            <Link to="/create" className="text-foreground hover:text-gold-600 transition-colors">
              ایجاد جدید
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <UserMenu />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-foreground hover:text-gold-600"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Expandable Search/Filter Section */}
        {isMenuOpen && (
          <div className="border-t border-border py-4 space-y-4">
            {/* Mobile Navigation */}
            <nav className="md:hidden flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-foreground hover:text-gold-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                صفحه اصلی
              </Link>
              <Link 
                to="/wall" 
                className="text-foreground hover:text-gold-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                دیوار گفتگو
              </Link>
              <Link 
                to="/create" 
                className="text-foreground hover:text-gold-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ایجاد جدید
              </Link>
              <div className="pt-2 border-t border-border">
                <UserMenu />
              </div>
            </nav>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="جستجوی نمایش، هنرمند، یا تالار..."
                className="pr-10"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                امروز
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                این هفته
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                تهران
              </Button>
              <Button variant="outline" size="sm">
                کمدی
              </Button>
              <Button variant="outline" size="sm">
                درام
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ExpandableHeader;
