import React from 'react'
import AppRoutes from './AppRoutes'
import { AuthProvider } from './context/AuthContext'
import ChatBot from './components/chatbot' // ✅ Import ChatBot
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <AppRoutes />
        <ScrollToTop />
        <ChatBot /> {/* ✅ Chatbot visible on all pages */}
      </AuthProvider>
    </div>
  )
}

export default App
