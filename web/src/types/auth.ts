export interface User {
    id: number
    email: string
    username?: string
    isAuthenticated: boolean
    timestamp: number
}

export interface LoginData {
    email: string
    password: string
}

export interface RegisterData extends LoginData {
    username: string
    confirmPassword: string
}

export interface AuthContextType {
    user: User | null
    login: (userData: User) => void
    logout: () => void
}

export interface AuthError {
    message: string
    code: string
}
