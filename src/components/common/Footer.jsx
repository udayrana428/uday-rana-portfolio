export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portfolio</h3>
            <p className="text-gray-300">
              Building amazing web experiences with modern technologies.
            </p>
          </div>
          <div className="grid grid-cols-2 ">
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-200">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-200">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-200">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-yellow-200">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-300">
          <p>&copy; 2024 Your Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
