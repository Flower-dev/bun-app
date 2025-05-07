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

const registerSchema = z
    .object({
        username: z.string().min(1, 'Username is required'),
        email: z.string().email('Invalid email address'),
        password: z
            .string()
            .min(6, 'Password must contain at least 6 characters'),
        confirmPassword: z.string().min(6, 'Confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

type RegisterFormValues = z.infer<typeof registerSchema>

// Function to call the register API
const registerApi = async (
    data: Omit<RegisterFormValues, 'confirmPassword'>
) => {
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

export function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()
    const { login } = useAuth()
    const [error, setError] = useState<{ message: string } | null>(null)

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const registerMutation = useMutation({
        mutationFn: async ({ ...registerData }: RegisterFormValues) => {
            return registerApi(registerData)
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
                toast({
                    title: 'Account created successfully',
                    description: 'You are now logged in',
                })
                navigate('/dashboard')
            } else {
                setError({
                    message: 'Error during registration',
                })
            }
        },
        onError: (error: Error) => {
            setError({ message: error.message })
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message || 'Error during registration',
            })
        },
    })

    const onSubmit = async (data: RegisterFormValues) => {
        setError(null)
        registerMutation.mutate(data)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center font-bold bg-gradient-to-r from-amber-600 to-purple-900 text-transparent bg-clip-text animate-fade-in">
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to create your account
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
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="JohnDoe"
                                {...form.register('username')}
                            />
                            {form.formState.errors.username && (
                                <p className="text-sm text-red-500 mt-1">
                                    {form.formState.errors.username.message}
                                </p>
                            )}
                        </div>
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
                            <Label htmlFor="password">Password</Label>
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirm password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="••••••••"
                                    {...form.register('confirmPassword')}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">
                                        {showConfirmPassword
                                            ? 'Hide password'
                                            : 'Show password'}
                                    </span>
                                </Button>
                            </div>
                            {form.formState.errors.confirmPassword && (
                                <p className="text-sm text-red-500 mt-1">
                                    {
                                        form.formState.errors.confirmPassword
                                            .message
                                    }
                                </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                                Password must contain at least 6 characters
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                             className="w-full bg-purple-950 shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105 px-6 py-3"
                            disabled={registerMutation.isPending}
                        >
                            {registerMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                'Create account'
                            )}
                        </Button>
                        <div className="text-center text-sm">
                            You already have an account?{' '}
                            <Button
                                variant="link"
                                className="p-0 h-auto"
                                onClick={() => navigate('/login')}
                                type="button"
                            >
                                Login
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
