import type React from 'react'

import { useState, useEffect } from 'react'
import { Loader2, Save } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
// import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@/hooks/use-user'
import { useTheme } from '../../context/themeContext'

export default function Profile() {
    const { t, i18n } = useTranslation()
    const { toast } = useToast()
    const [isSaving, setIsSaving] = useState(false)
    const { data: userData, isLoading } = useUser()
    const { theme, setTheme } = useTheme()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
    })

    const [preferences, setPreferences] = useState({
        theme: 'light',
        language: 'fr',
        emailNotifications: true,
        pushNotifications: false,
        articlesPerPage: 10,
        markReadOnScroll: true,
        openLinksInNewTab: true,
    })

    useEffect(() => {
        if (userData && userData.user) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                name: userData.user.username,
                email: userData.user.email,
            }))
        }
    }, [userData])

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
                <h1 className="text-3xl font-bold tracking-tight">
                    {t('profile.title')}
                </h1>
                <p className="text-muted-foreground">
                    {t('profile.description')}
                </p>
            </div>

            <Tabs defaultValue="account">
                <TabsList className="mb-4">
                    <TabsTrigger value="account">
                        {t('profile.tabs.account')}
                    </TabsTrigger>
                    <TabsTrigger value="password">
                        {t('profile.tabs.password')}
                    </TabsTrigger>
                    <TabsTrigger value="preferences">
                        {t('profile.tabs.preferences')}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                    <Card>
                        <form onSubmit={handleProfileSubmit}>
                            <CardHeader>
                                <CardTitle>
                                    {t('profile.account.title')}
                                </CardTitle>
                                <CardDescription>
                                    {t('profile.account.description')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        {t('profile.account.fullName')}
                                    </Label>
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
                                    <Label htmlFor="email">
                                        {t('profile.account.email')}
                                    </Label>
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
                                {/* <div className="space-y-2">
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
                                </div> */}
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t('profile.buttons.saving')}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            {t('profile.buttons.save')}
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
                                <CardTitle>
                                    {t('profile.password.title')}
                                </CardTitle>
                                <CardDescription>
                                    {t('profile.password.description')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">
                                        Mot de passe actuel
                                    </Label>
                                    {/* <Input
                                        id="current-password"
                                        type="password"
                                        value={formData.currentPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                currentPassword: e.target.value,
                                            })
                                        }
                                    /> */}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">
                                        Nouveau mot de passe
                                    </Label>
                                    {/* <Input
                                        id="new-password"
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                newPassword: e.target.value,
                                            })
                                        }
                                    /> */}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">
                                        Confirmer le mot de passe
                                    </Label>
                                    {/* <Input
                                        id="confirm-password"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                    /> */}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t('profile.buttons.saving')}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            {t('profile.buttons.save')}
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
                                <CardTitle>
                                    {t('profile.preferences.title')}
                                </CardTitle>
                                <CardDescription>
                                    {t('profile.preferences.subtitle')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">
                                        {t(
                                            'profile.preferences.appearance.title'
                                        )}
                                    </h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="theme">
                                            {t(
                                                'profile.preferences.appearance.theme'
                                            )}
                                        </Label>
                                        <Select
                                            value={theme}
                                            onValueChange={(value) => {
                                                setTheme(
                                                    value as 'light' | 'dark'
                                                )
                                                setPreferences({
                                                    ...preferences,
                                                    theme: value,
                                                })
                                            }}
                                        >
                                            <SelectTrigger id="theme">
                                                <SelectValue
                                                    placeholder={t(
                                                        'profile.preferences.appearance.theme'
                                                    )}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">
                                                    {t(
                                                        'profile.preferences.appearance.themes.light'
                                                    )}
                                                </SelectItem>
                                                <SelectItem value="dark">
                                                    {t(
                                                        'profile.preferences.appearance.themes.dark'
                                                    )}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">
                                        {t(
                                            'profile.preferences.language.title'
                                        )}
                                    </h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="language">
                                            {t(
                                                'profile.preferences.language.label'
                                            )}
                                        </Label>
                                        <Select
                                            value={i18n.language}
                                            onValueChange={(value) => {
                                                i18n.changeLanguage(value)
                                                setPreferences({
                                                    ...preferences,
                                                    language: value,
                                                })
                                            }}
                                        >
                                            <SelectTrigger id="language">
                                                <SelectValue
                                                    placeholder={t(
                                                        'profile.preferences.language.label'
                                                    )}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="fr">
                                                    {t(
                                                        'profile.preferences.language.languages.fr'
                                                    )}
                                                </SelectItem>
                                                <SelectItem value="en">
                                                    {t(
                                                        'profile.preferences.language.languages.en'
                                                    )}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">
                                        {t(
                                            'profile.preferences.notifications.title'
                                        )}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-notifications">
                                                {t(
                                                    'profile.preferences.notifications.email.title'
                                                )}
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                {t(
                                                    'profile.preferences.notifications.email.description'
                                                )}
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
                                                {t(
                                                    'profile.preferences.notifications.push.title'
                                                )}
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                {t(
                                                    'profile.preferences.notifications.push.description'
                                                )}
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
                                        {t('profile.preferences.reading.title')}
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
                                            {t('profile.buttons.saving')}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            {t('profile.buttons.save')}
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
