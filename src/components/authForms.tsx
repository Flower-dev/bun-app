import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuthForms } from '../hooks/use-authform'
import { useTranslation } from 'react-i18next'

const AuthForms: React.FC = () => {
    const {
        isLoginMode,
        error,
        loginData,
        registerData,
        handleLogin,
        handleRegister,
        toggleMode,
        updateLoginData,
        updateRegisterData,
    } = useAuthForms()

    const { t } = useTranslation()

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="flex justify-center">
                    <CardTitle>
                        {t(isLoginMode ? 'Connexion' : 'Inscription')}
                    </CardTitle>
                    <CardDescription>
                        {isLoginMode
                            ? 'Connectez-vous à votre compte'
                            : 'Créez un nouveau compte'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    )}

                    {isLoginMode ? (
                        <form
                            onSubmit={handleLogin}
                            className="space-y-4"
                            data-testid="login-form"
                        >
                            <Input
                                type="email"
                                placeholder="jane.doe@gmail.com"
                                value={loginData.email}
                                onChange={(e) =>
                                    updateLoginData('email', e.target.value)
                                }
                                data-testid="login-email"
                            />

                            <Input
                                type="password"
                                placeholder="Mot de passe"
                                value={loginData.password}
                                onChange={(e) =>
                                    updateLoginData('password', e.target.value)
                                }
                                data-testid="login-password"
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                data-testid="login-submit"
                            >
                                Se connecter
                            </Button>
                        </form>
                    ) : (
                        <form
                            onSubmit={handleRegister}
                            className="space-y-4"
                            data-testid="register-form"
                        >
                            <Input
                                type="text"
                                placeholder="Jane"
                                value={registerData.username}
                                onChange={(e) =>
                                    updateRegisterData(
                                        'username',
                                        e.target.value
                                    )
                                }
                                data-testid="register-username"
                            />

                            <Input
                                type="email"
                                placeholder="jane.doe@gmail.com"
                                value={registerData.email}
                                onChange={(e) =>
                                    updateRegisterData('email', e.target.value)
                                }
                                data-testid="register-email"
                            />

                            <Input
                                type="password"
                                placeholder="Mot de passe"
                                value={registerData.password}
                                onChange={(e) =>
                                    updateRegisterData(
                                        'password',
                                        e.target.value
                                    )
                                }
                                data-testid="register-password"
                            />

                            <Input
                                type="password"
                                placeholder="Confirmer le mot de passe"
                                value={registerData.confirmPassword}
                                onChange={(e) =>
                                    updateRegisterData(
                                        'confirmPassword',
                                        e.target.value
                                    )
                                }
                                data-testid="register-confirm-password"
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                data-testid="register-submit"
                            >
                                S'inscrire
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter>
                    <Button
                        variant="link"
                        onClick={toggleMode}
                        className="w-full"
                        data-testid="toggle-mode"
                    >
                        {isLoginMode
                            ? "Pas encore de compte ? S'inscrire"
                            : 'Déjà un compte ? Se connecter'}
                    </Button>
                </CardFooter>
            </Card>
        </section>
    )
}

export default AuthForms
