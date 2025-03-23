import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import type { LoginData, RegisterData, AuthError } from '@/types/auth'
import { useState } from 'react'

const API_URL = 'http://localhost:3000'

const loginApi = async (data: LoginData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok || result.error) {
        throw new Error(
            result.error || result.message || 'Erreur lors de la connexion'
        )
    }

    return result
}

const registerApi = async (data: Omit<RegisterData, 'confirmPassword'>) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok || result.error) {
        throw new Error(
            result.error || result.message || "Erreur lors de l'inscription"
        )
    }

    return result
}

export const useAuthForms = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [isLoginMode, setIsLoginMode] = useState(true)
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
        if (!data.email || !data.password)
            return {
                message: 'Tous les champs sont requis',
                code: 'EMPTY_FIELDS',
            }
        if (!data.email.includes('@'))
            return { message: 'Email invalide', code: 'INVALID_EMAIL' }
        if (data.password.length < 6)
            return {
                message: 'Le mot de passe doit contenir au moins 6 caractères',
                code: 'INVALID_PASSWORD',
            }
        return null
    }

    const validateRegisterData = (data: RegisterData): AuthError | null => {
        const error = validateLoginData(data)
        if (error) return error
        if (!data.username)
            return {
                message: "Nom d'utilisateur requis",
                code: 'EMPTY_USERNAME',
            }
        if (data.password !== data.confirmPassword)
            return {
                message: 'Les mots de passe ne correspondent pas',
                code: 'PASSWORD_MISMATCH',
            }
        return null
    }

    const loginMutation = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            if (data.success && data.user) {
                login({
                    id: data.user.id,
                    email: data.user.email,
                    username: data.user.username,
                    isAuthenticated: true,
                    timestamp: Date.now(),
                })
                localStorage.setItem('lastLoginEmail', data.user.email)
                navigate('/dashboard')
            } else {
                setError({
                    message: 'Erreur lors de la connexion',
                    code: 'LOGIN_ERROR',
                })
            }
        },
        onError: (error: Error) => {
            setError({ message: error.message, code: 'LOGIN_ERROR' })
        },
    })

    const registerMutation = useMutation({
        mutationFn: async (data: RegisterData) => {
            const { ...registerData } = data
            return registerApi(registerData)
        },
        onSuccess: (data) => {
            if (data.status === 201) {
                navigate('/auth/login')
            } else {
                setError({
                    message: data.error || "Erreur lors de l'inscription",
                    code: 'REGISTER_ERROR',
                })
            }
        },
        onError: (error: Error) => {
            setError({ message: error.message, code: 'REGISTER_ERROR' })
        },
    })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const validationError = validateLoginData(loginData)
        if (validationError) {
            setError(validationError)
            return
        }

        loginMutation.mutate(loginData)
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const validationError = validateRegisterData(registerData)
        if (validationError) {
            setError(validationError)
            return
        }

        registerMutation.mutate(registerData)
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
        isLoading: loginMutation.isPending || registerMutation.isPending,
        handleLogin,
        handleRegister,
        toggleMode,
        updateLoginData,
        updateRegisterData,
    }
}
