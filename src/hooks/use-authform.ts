import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import type { LoginData, RegisterData, AuthError } from '@/types/auth'

export const useAuthForms = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true)
    const [error, setError] = useState<AuthError | null>(null)

    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: '',
    })

    const [registerData, setRegisterData] = useState<RegisterData>({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
    })

    const validateLoginData = (data: LoginData): AuthError | null => {
        if (!data.email || !data.password) {
            return {
                message: 'Veuillez remplir tous les champs',
                code: 'EMPTY_FIELDS',
            }
        }
        if (!data.email.includes('@')) {
            return { message: 'Email invalide', code: 'INVALID_EMAIL' }
        }
        if (data.password.length < 8) {
            return {
                message: 'Le mot de passe doit contenir au moins 8 caractères',
                code: 'INVALID_PASSWORD',
            }
        }
        return null
    }

    const validateRegisterData = (data: RegisterData): AuthError | null => {
        const loginError = validateLoginData(data)
        if (loginError) return loginError

        if (!data.username) {
            return {
                message: "Le nom d'utilisateur est requis",
                code: 'EMPTY_USERNAME',
            }
        }
        if (data.password !== data.confirmPassword) {
            return {
                message: 'Les mots de passe ne correspondent pas',
                code: 'PASSWORD_MISMATCH',
            }
        }
        return null
    }

    const handleLogin = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()

        const validationError = validateLoginData(loginData)
        if (validationError) {
            setError(validationError)
            return
        }

        try {
            const userData = {
                email: loginData.email,
                isAuthenticated: true,
                timestamp: new Date().getTime(),
            }

            // Persist login data in localStorage
            localStorage.setItem('lastLoginEmail', loginData.email)

            await login(userData)
            navigate('/dashboard')
        } catch (err) {
            setError({
                message: 'Erreur lors de la connexion',
                code: 'LOGIN_ERROR',
            })
        }
    }

    const handleRegister = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()

        const validationError = validateRegisterData(registerData)
        if (validationError) {
            setError(validationError)
            return
        }

        try {
            const userData = {
                email: registerData.email,
                username: registerData.username,
                isAuthenticated: true,
                timestamp: new Date().getTime(),
            }

            await login(userData)
            navigate('/dashboard')
        } catch (err) {
            setError({
                message: "Erreur lors de l'inscription",
                code: 'REGISTER_ERROR',
            })
        }
    }

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode)
        setError(null)
    }

    const updateLoginData = (field: keyof LoginData, value: string) => {
        setLoginData((prev) => ({ ...prev, [field]: value }))
        setError(null)
    }

    const updateRegisterData = (field: keyof RegisterData, value: string) => {
        setRegisterData((prev) => ({ ...prev, [field]: value }))
        setError(null)
    }

    return {
        isLoginMode,
        error,
        loginData,
        registerData,
        handleLogin,
        handleRegister,
        toggleMode,
        updateLoginData,
        updateRegisterData,
    }
}
