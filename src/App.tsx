import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthForms from './components/authForms'
import Dashboard from './app/dashboard'
import Settings from './app/settings'
import { AuthProvider } from './context/authContext'
import { ThemeProvider } from './context/themeContext'
import { ProtectedRoute } from './routes/protectedRoutes'
import './index.css'

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth" element={<AuthForms />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/"
                            element={<Navigate to="/auth" replace />}
                        />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
