import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from '../context/authContext';
import type { LoginData, RegisterData } from '@/types/auth';
import { useTranslation } from 'react-i18next';

const AuthForms = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const { t } = useTranslation();
  
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const userData = {
      email: loginData.email,
      isAuthenticated: true,
      timestamp: new Date().getTime()
    };

    login(userData);
    navigate('/dashboard');
  };

  const handleRegister = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (!registerData.email || !registerData.password || !registerData.confirmPassword || !registerData.username) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    const userData = {
      email: registerData.email,
      username: registerData.username,
      isAuthenticated: true,
      timestamp: new Date().getTime()
    };

    login(userData);
    navigate('/dashboard');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle> {t(isLoginMode ? 'auth.login.title' : 'auth.register.title')}</CardTitle>
          <CardDescription>
            {isLoginMode 
              ? 'Connectez-vous à votre compte' 
              : 'Créez un nouveau compte'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {isLoginMode ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full">
                S'inscrire
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            variant="link" 
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setError('');
            }}
            className="w-full"
          >
            {isLoginMode 
              ? "Pas encore de compte ? S'inscrire" 
              : 'Déjà un compte ? Se connecter'}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AuthForms;