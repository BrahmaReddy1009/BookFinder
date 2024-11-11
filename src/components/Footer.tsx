import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-2  fixed bottom-0 left-0 w-full">
      <div className="w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section: Company Info */}
          <div className="text-center md:text-left mb-6 md:mb-0 flex flex-row">
            <h2 className="text-2xl font-bold text-indigo-400">NovelHunt</h2>
            <p className="mt-2 text-[12px] ml-6">
              &copy; {new Date().getFullYear()} NovelHunt. All rights reserved.
            </p>
          </div>

         

          {/* Right Section: Social Media */}
          <div className="flex space-x-6">
            <a href="#" className="text-xl hover:text-indigo-400">
              <FaFacebookF />
            </a>
            <a href="#" className="text-xl hover:text-indigo-400">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl hover:text-indigo-400">
              <FaInstagram />
            </a>
            <a href="#" className="text-xl hover:text-indigo-400">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
