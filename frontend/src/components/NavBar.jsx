import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaHardHat } from "react-icons/fa";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="px-4 py-3">
            <nav className="bg-[#003f6b] text-white py-5 px-6 shadow-xl rounded-lg border-t-4 ">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-2 group">
                        <FaHardHat className="text-[#feb913] group-hover:text-[#7acdf1] transition-colors duration-300" size={30} />
                        <div>
                            <span className="text-white group-hover:text-[#7acdf1] transition-colors duration-300">Construction</span>
                            <span className="text-[#feb913] group-hover:text-[#f6821f] transition-colors duration-300">Xpert</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        <NavLink to="/" label="Home" />
                    </div>

                    <button
                        className="md:hidden bg-[#dc4048] hover:bg-[#f6821f] p-2 rounded-lg transition-colors duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden flex flex-col space-y-4 mt-4 bg-[#003f6b] border-l-4 border-[#dc4048] p-5 rounded-lg">
                        <NavLink to="/" label="Home" />

                    </div>
                )}
            </nav>
        </div>
    );
};

const NavLink = ({ to, label }) => (
    <Link
        to={to}
        className="font-medium relative group"
    >
        <span className="text-white hover:text-[#feb913] transition-colors duration-200">{label}</span>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7acdf1] group-hover:w-full transition-all duration-300 ease-in-out"></span>
    </Link>
);
export default NavBar;