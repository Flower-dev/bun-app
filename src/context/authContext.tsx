import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, AuthContextType } from '../types/auth'

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('userData')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (userData: User): void => {
        setUser(userData)
        localStorage.setItem('userData', JSON.stringify(userData))
    }

    const logout = (): void => {
        setUser(null)
        localStorage.removeItem('userData')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
