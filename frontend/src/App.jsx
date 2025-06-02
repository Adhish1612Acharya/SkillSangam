import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import { useState, useEffect } from 'react'

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loading for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Loader loading={loading} />
        {!loading && (
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        )}
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App