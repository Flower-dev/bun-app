import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/context/authContext'

const API_URL = 'http://localhost:3000'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

// Function to call the login API
const loginApi = async (data: LoginFormValues) => {
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

export function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()
    const { login } = useAuth()
    const [error, setError] = useState<{ message: string } | null>(null)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

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
                toast({
                    title: 'Login successful',
                    description: 'Welcome to your RSS feed manager',
                })
                navigate('/dashboard')
            } else {
                setError({
                    message: 'Error during login',
                })
            }
        },
        onError: (error: Error) => {
            setError({ message: error.message })
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message || 'Error during login',
            })
        },
    })

    const onSubmit = async (data: LoginFormValues) => {
        setError(null)
        loginMutation.mutate(data)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {error.message}
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                {...form.register('email')}
                            />
                            {form.formState.errors.email && (
                                <p className="text-sm text-red-500 mt-1">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-xs"
                                    onClick={() =>
                                        navigate('/auth/reset-password')
                                    }
                                    type="button"
                                >
                                    Forgot password?
                                </Button>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    {...form.register('password')}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">
                                        {showPassword
                                            ? 'Hide password'
                                            : 'Show password'}
                                    </span>
                                </Button>
                            </div>
                            {form.formState.errors.password && (
                                <p className="text-sm text-red-500 mt-1">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                        <div className="text-center text-sm">
                            You don't have an account?{' '}
                            <Button
                                variant="link"
                                className="p-0 h-auto"
                                onClick={() => navigate('/signup')}
                                type="button"
                            >
                                Create an account
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
