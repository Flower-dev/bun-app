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

export function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()
    const {
        registerData,
        updateRegisterData,
        handleRegister,
        error,
        isLoading,
    } = useAuthForms()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await handleRegister(e)

            if (!error) {
                toast({
                    title: 'Compte créé avec succès',
                    description: 'Vous pouvez maintenant vous connecter',
                })
            }
        } catch (err) {
            toast({
                variant: 'destructive',
                title: 'Erreur',
                description:
                    err instanceof Error
                        ? err.message
                        : "Erreur lors de l'inscription",
            })
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        Créer un compte
                    </CardTitle>
                    <CardDescription>
                        Entrez vos informations pour créer votre compte
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
                            <Label htmlFor="username">Nom d'utilisateur</Label>
                            <Input
                                id="username"
                                placeholder="JohnDoe"
                                value={registerData.username}
                                onChange={(e) =>
                                    updateRegisterData(
                                        'username',
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="exemple@email.com"
                                value={registerData.email}
                                onChange={(e) =>
                                    updateRegisterData('email', e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={registerData.password}
                                    onChange={(e) =>
                                        updateRegisterData(
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirmer le mot de passe
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
                                    value={registerData.confirmPassword}
                                    onChange={(e) =>
                                        updateRegisterData(
                                            'confirmPassword',
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
                                            ? 'Cacher le mot de passe'
                                            : 'Afficher le mot de passe'}
                                    </span>
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Le mot de passe doit contenir au moins 6
                                caractères
                            </p>
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
                                    Création en cours...
                                </>
                            ) : (
                                'Créer un compte'
                            )}
                        </Button>
                        <div className="text-center text-sm">
                            Vous avez déjà un compte?{' '}
                            <Button
                                variant="link"
                                className="p-0 h-auto"
                                onClick={() => navigate('/login')}
                                type="button"
                            >
                                Se connecter
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
