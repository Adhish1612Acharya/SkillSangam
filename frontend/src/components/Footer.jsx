const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Sainik Sahayak</h3>
            <p className="text-gray-400">Supporting our armed forces and their families</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-primary-light">Privacy Policy</a>
            <a href="#" className="hover:text-primary-light">Terms of Service</a>
            <a href="#" className="hover:text-primary-light">Contact Us</a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Sainik Sahayak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer