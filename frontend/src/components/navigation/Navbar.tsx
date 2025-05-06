import Logo from "./Logo";
import { getEmailFromLocalStorage } from "@/utils/getUserEmailFromLocalStorage";
// Usage:

const Navbar = () => {
  const email = getEmailFromLocalStorage();
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              Welcome, {email}
              {/* <ChevronDown size={16} className="ml-1 text-gray-500" /> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;