import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginPage } from './components/auth/login'
import { SignupPage } from './components/auth/register'
import Dashboard from './app/pages/dashboard'
import RssLandingPage from './app/landing'
import { AuthProvider } from './context/authContext'
import { ThemeProvider } from './context/themeContext'
import DashboardLayout from './components/layouts/layout'

import './index.css'
import Profile from './app/pages/profile'
import Settings from './app/settings'

// Create a client
const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<RssLandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route
                            element={
                                <ThemeProvider storageKey="vite-ui-theme">
                                    <DashboardLayout />
                                </ThemeProvider>
                            }
                        >
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/settings" element={<Settings />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App
