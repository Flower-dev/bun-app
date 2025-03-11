import type React from 'react'
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
import { useAuthForms } from '@/hooks/use-authform'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()
    const { loginData, updateLoginData, handleLogin, error, isLoading } =
        useAuthForms()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await handleLogin(e)

            if (!error) {
                toast({
                    title: 'Connexion réussie',
                    description: 'Bienvenue sur votre gestionnaire de flux RSS',
                })
            }
        } catch (err) {
            toast({
                variant: 'destructive',
                title: 'Erreur',
                description:
                    err instanceof Error
                        ? err.message
                        : 'Erreur lors de la connexion',
            })
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        Connexion
                    </CardTitle>
                    <CardDescription>
                        Entrez vos identifiants pour accéder à votre compte
                    </CardDescription>
                </CardHeader>
                <form onSubmit={onSubmit}>
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
                                placeholder="exemple@email.com"
                                value={loginData.email}
                                onChange={(e) =>
                                    updateLoginData('email', e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-xs"
                                    onClick={() =>
                                        navigate('/auth/reset-password')
                                    }
                                    type="button"
                                >
                                    Mot de passe oublié?
                                </Button>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={loginData.password}
                                    onChange={(e) =>
                                        updateLoginData(
                                            'password',
                                            e.target.value
                                        )
                                    }
                                    required
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
                                            ? 'Cacher le mot de passe'
                                            : 'Afficher le mot de passe'}
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Connexion en cours...
                                </>
                            ) : (
                                'Se connecter'
                            )}
                        </Button>
                        <div className="text-center text-sm">
                            Vous n'avez pas de compte?{' '}
                            <Button
                                variant="link"
                                className="p-0 h-auto"
                                onClick={() => navigate('/signup')}
                                type="button"
                            >
                                Créer un compte
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
