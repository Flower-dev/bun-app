import type React from 'react'

import { useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@/hooks/use-user'

export default function Profile() {
    const { toast } = useToast()
    const [isSaving, setIsSaving] = useState(false)
    const { data: userData, isLoading } = useUser()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const [preferences, setPreferences] = useState({
        theme: 'system',
        emailNotifications: true,
        pushNotifications: false,
        articlesPerPage: 10,
        markReadOnScroll: true,
        openLinksInNewTab: true,
    })

    // Mettre à jour les données du formulaire lorsque le profil est chargé
    useState(() => {
        if (userData?.user) {
            setFormData({
                ...formData,
                name: userData.user.username,
                email: userData.user.email,
            })
        }
    })

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        // Simuler une sauvegarde
        setTimeout(() => {
            setIsSaving(false)
            toast({
                title: 'Profil mis à jour',
                description:
                    'Vos informations ont été enregistrées avec succès',
            })
        }, 1500)
    }

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        // Simuler une sauvegarde
        setTimeout(() => {
            setIsSaving(false)
            setFormData({
                ...formData,
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
            toast({
                title: 'Mot de passe mis à jour',
                description: 'Votre mot de passe a été modifié avec succès',
            })
        }, 1500)
    }

    const handlePreferencesSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        // Simuler une sauvegarde
        setTimeout(() => {
            setIsSaving(false)
            toast({
                title: 'Préférences mises à jour',
                description: 'Vos préférences ont été enregistrées avec succès',
            })
        }, 1500)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
                <p className="text-muted-foreground">
                    Gérez vos informations personnelles et vos préférences
                </p>
            </div>

            <Tabs defaultValue="account">
                <TabsList className="mb-4">
                    <TabsTrigger value="account">Compte</TabsTrigger>
                    <TabsTrigger value="password">Mot de passe</TabsTrigger>
                    <TabsTrigger value="preferences">Préférences</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                    <Card>
                        <form onSubmit={handleProfileSubmit}>
                            <CardHeader>
                                <CardTitle>Informations du compte</CardTitle>
                                <CardDescription>
                                    Mettez à jour vos informations personnelles
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom complet</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                bio: e.target.value,
                                            })
                                        }
                                        className="min-h-[100px]"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Enregistrement...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Enregistrer
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>

                <TabsContent value="password">
                    <Card>
                        <form onSubmit={handlePasswordSubmit}>
                            <CardHeader>
                                <CardTitle>Changer le mot de passe</CardTitle>
                                <CardDescription>
                                    Mettez à jour votre mot de passe pour
                                    sécuriser votre compte
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">
                                        Mot de passe actuel
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        value={formData.currentPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                currentPassword: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">
                                        Nouveau mot de passe
                                    </Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                newPassword: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">
                                        Confirmer le mot de passe
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Enregistrement...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Mettre à jour le mot de passe
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>

                <TabsContent value="preferences">
                    <Card>
                        <form onSubmit={handlePreferencesSubmit}>
                            <CardHeader>
                                <CardTitle>Préférences</CardTitle>
                                <CardDescription>
                                    Personnalisez votre expérience de lecture
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">
                                        Apparence
                                    </h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="theme">Thème</Label>
                                        <Select
                                            value={preferences.theme}
                                            onValueChange={(value) =>
                                                setPreferences({
                                                    ...preferences,
                                                    theme: value,
                                                })
                                            }
                                        >
                                            <SelectTrigger id="theme">
                                                <SelectValue placeholder="Sélectionner un thème" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">
                                                    Clair
                                                </SelectItem>
                                                <SelectItem value="dark">
                                                    Sombre
                                                </SelectItem>
                                                <SelectItem value="system">
                                                    Système
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">
                                        Notifications
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-notifications">
                                                Notifications par email
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Recevoir des notifications par
                                                email pour les nouveaux articles
                                            </p>
                                        </div>
                                        <Switch
                                            id="email-notifications"
                                            checked={
                                                preferences.emailNotifications
                                            }
                                            onCheckedChange={(checked) =>
                                                setPreferences({
                                                    ...preferences,
                                                    emailNotifications: checked,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="push-notifications">
                                                Notifications push
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Recevoir des notifications push
                                                pour les nouveaux articles
                                            </p>
                                        </div>
                                        <Switch
                                            id="push-notifications"
                                            checked={
                                                preferences.pushNotifications
                                            }
                                            onCheckedChange={(checked) =>
                                                setPreferences({
                                                    ...preferences,
                                                    pushNotifications: checked,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">
                                        Lecture
                                    </h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="articles-per-page">
                                            Articles par page
                                        </Label>
                                        <Select
                                            value={preferences.articlesPerPage.toString()}
                                            onValueChange={(value) =>
                                                setPreferences({
                                                    ...preferences,
                                                    articlesPerPage:
                                                        Number.parseInt(value),
                                                })
                                            }
                                        >
                                            <SelectTrigger id="articles-per-page">
                                                <SelectValue placeholder="Nombre d'articles" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="5">
                                                    5 articles
                                                </SelectItem>
                                                <SelectItem value="10">
                                                    10 articles
                                                </SelectItem>
                                                <SelectItem value="20">
                                                    20 articles
                                                </SelectItem>
                                                <SelectItem value="50">
                                                    50 articles
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="mark-read-on-scroll">
                                                Marquer comme lu au défilement
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Marquer automatiquement les
                                                articles comme lus lors du
                                                défilement
                                            </p>
                                        </div>
                                        <Switch
                                            id="mark-read-on-scroll"
                                            checked={
                                                preferences.markReadOnScroll
                                            }
                                            onCheckedChange={(checked) =>
                                                setPreferences({
                                                    ...preferences,
                                                    markReadOnScroll: checked,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="open-links-in-new-tab">
                                                Ouvrir les liens dans un nouvel
                                                onglet
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Ouvrir automatiquement les liens
                                                des articles dans un nouvel
                                                onglet
                                            </p>
                                        </div>
                                        <Switch
                                            id="open-links-in-new-tab"
                                            checked={
                                                preferences.openLinksInNewTab
                                            }
                                            onCheckedChange={(checked) =>
                                                setPreferences({
                                                    ...preferences,
                                                    openLinksInNewTab: checked,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Enregistrement...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Enregistrer les préférences
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
