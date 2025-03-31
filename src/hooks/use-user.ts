import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/authContext'

const API_URL = 'http://localhost:3000'

interface UserResponse {
    success: boolean
    user?: {
        id: number
        email: string
        username: string
    }
    message?: string
}

const fetchUser = async (userId: string): Promise<UserResponse> => {
    const response = await fetch(`${API_URL}/user/${userId}`, {
        credentials: 'include',
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || "Erreur lors de la récupération de l'utilisateur"
        )
    }

    return result
}

export const useUser = (userId?: string) => {
    const { user } = useAuth()

    return useQuery({
        queryKey: ['user', userId || user?.id],
        queryFn: () => fetchUser(userId || user?.id?.toString() || ''),
        enabled: !!userId || !!user?.id,
    })
}
