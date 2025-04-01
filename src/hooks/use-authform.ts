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
        credentials: 'include',
        body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Error during login')
    }

    return result
}

const registerApi = async (data: Omit<RegisterData, 'confirmPassword'>) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Error during registration')
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
                message: 'All fields are required',
                code: 'EMPTY_FIELDS',
            }
        if (!data.email.includes('@'))
            return { message: 'Invalid email', code: 'INVALID_EMAIL' }
        if (data.password.length < 6)
            return {
                message: 'Password must contain at least 6 characters',
                code: 'INVALID_PASSWORD',
            }
        return null
    }

    const validateRegisterData = (data: RegisterData): AuthError | null => {
        const error = validateLoginData(data)
        if (error) return error
        if (!data.username)
            return {
                message: 'Username is required',
                code: 'EMPTY_USERNAME',
            }
        if (data.password !== data.confirmPassword)
            return {
                message: 'Passwords do not match',
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
                    message: 'Error during login',
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
            return registerApi(data)
        },
        onSuccess: (data) => {
            if (data.success && data.user) {
                login({
                    id: data.user.id,
                    email: data.user.email,
                    username: data.user.username,
                    isAuthenticated: true,
                    timestamp: Date.now(),
                })
                navigate('/dashboard')
            } else {
                setError({
                    message: data.message || 'Error during registration',
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
