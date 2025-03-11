import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    Loader2,
    Save,
    Trash2,
    Download,
    Upload,
    Shield,
    Bell,
    Monitor,
    Database,
    Sliders,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/hooks/use-toast'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

// Simuler une API pour récupérer les paramètres
const fetchSettings = async () => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
        general: {
            language: 'fr',
            startPage: 'dashboard',
            autoRefresh: true,
            refreshInterval: 30,
        },
        notifications: {
            newArticles: true,
            newArticlesSound: false,
            digestEmail: true,
            digestFrequency: 'daily',
            pushNotifications: true,
        },
        display: {
            articleDensity: 'comfortable',
            fontSize: 16,
            showImages: true,
            showSummary: true,
            markReadOnScroll: true,
            openLinksIn: 'new-tab',
        },
        data: {
            cacheSize: 100,
            keepArticles: '30days',
            autoCleanup: true,
            exportFormat: 'opml',
        },
        advanced: {
            enableKeyboardShortcuts: true,
            enableBetaFeatures: false,
            debugMode: false,
            customCSS: '',
        },
    }
}

export default function Settings() {
    const { toast } = useToast()
    const [isSaving, setIsSaving] = useState(false)

    const { data: settings, isLoading } = useQuery({
        queryKey: ['settings'],
        queryFn: fetchSettings,
    })

    const [formData, setFormData] = useState({
        general: {
            language: 'fr',
            startPage: 'dashboard',
            autoRefresh: true,
            refreshInterval: 30,
        },
        notifications: {
            newArticles: true,
            newArticlesSound: false,
            digestEmail: true,
            digestFrequency: 'daily',
            pushNotifications: true,
        },
        display: {
            articleDensity: 'comfortable',
            fontSize: 16,
            showImages: true,
            showSummary: true,
            markReadOnScroll: true,
            openLinksIn: 'new-tab',
        },
        data: {
            cacheSize: 100,
            keepArticles: '30days',
            autoCleanup: true,
            exportFormat: 'opml',
        },
        advanced: {
            enableKeyboardShortcuts: true,
            enableBetaFeatures: false,
            debugMode: false,
            customCSS: '',
        },
    })

    // Mettre à jour les données du formulaire lorsque les paramètres sont chargés
    useState(() => {
        if (settings) {
            setFormData(settings)
        }
    })

    const handleSaveSettings = (tab: string) => {
        setIsSaving(true)

        // Simuler une sauvegarde
        setTimeout(() => {
            setIsSaving(false)
            toast({
                title: 'Paramètres enregistrés',
                description: `Les paramètres ${tab} ont été mis à jour avec succès`,
            })
        }, 1500)
    }

    const handleExportData = () => {
        toast({
            title: 'Exportation des données',
            description: 'Vos données ont été exportées avec succès',
        })
    }

    const handleImportData = () => {
        toast({
            title: 'Importation des données',
            description: 'Vos données ont été importées avec succès',
        })
    }

    const handleResetSettings = () => {
        toast({
            title: 'Paramètres réinitialisés',
            description:
                'Tous les paramètres ont été réinitialisés aux valeurs par défaut',
        })
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
                    Paramètres
                </h1>
                <p className="text-muted-foreground">
                    Personnalisez votre expérience avec l'application RSS Feed
                </p>
            </div>

            <Tabs defaultValue="general">
                <TabsList className="mb-4 grid grid-cols-5 md:w-auto w-full">
                    <TabsTrigger value="general">Général</TabsTrigger>
                    <TabsTrigger value="notifications">
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="display">Affichage</TabsTrigger>
                    <TabsTrigger value="data">Données</TabsTrigger>
                    <TabsTrigger value="advanced">Avancé</TabsTrigger>
                </TabsList>

                {/* Paramètres généraux */}
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Monitor className="mr-2 h-5 w-5" />
                                Paramètres généraux
                            </CardTitle>
                            <CardDescription>
                                Configurez les paramètres de base de
                                l'application
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="language">Langue</Label>
                                <Select
                                    value={formData.general.language}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            general: {
                                                ...formData.general,
                                                language: value,
                                            },
                                        })
                                    }
                                >
                                    <SelectTrigger id="language">
                                        <SelectValue placeholder="Sélectionner une langue" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fr">
                                            Français
                                        </SelectItem>
                                        <SelectItem value="en">
                                            English
                                        </SelectItem>
                                        <SelectItem value="es">
                                            Español
                                        </SelectItem>
                                        <SelectItem value="de">
                                            Deutsch
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="startPage">
                                    Page de démarrage
                                </Label>
                                <Select
                                    value={formData.general.startPage}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            general: {
                                                ...formData.general,
                                                startPage: value,
                                            },
                                        })
                                    }
                                >
                                    <SelectTrigger id="startPage">
                                        <SelectValue placeholder="Sélectionner une page" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dashboard">
                                            Tableau de bord
                                        </SelectItem>
                                        <SelectItem value="feeds">
                                            Mes flux
                                        </SelectItem>
                                        <SelectItem value="discover">
                                            Découvrir
                                        </SelectItem>
                                        <SelectItem value="last-session">
                                            Dernière session
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="autoRefresh">
                                        Actualisation automatique
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Actualiser automatiquement les flux RSS
                                    </p>
                                </div>
                                <Switch
                                    id="autoRefresh"
                                    checked={formData.general.autoRefresh}
                                    onCheckedChange={(checked) =>
                                        setFormData({
                                            ...formData,
                                            general: {
                                                ...formData.general,
                                                autoRefresh: checked,
                                            },
                                        })
                                    }
                                />
                            </div>

                            {formData.general.autoRefresh && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="refreshInterval">
                                            Intervalle d'actualisation (minutes)
                                        </Label>
                                        <span className="text-sm">
                                            {formData.general.refreshInterval}{' '}
                                            min
                                        </span>
                                    </div>
                                    <Slider
                                        id="refreshInterval"
                                        min={5}
                                        max={120}
                                        step={5}
                                        value={[
                                            formData.general.refreshInterval,
                                        ]}
                                        onValueChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                general: {
                                                    ...formData.general,
                                                    refreshInterval: value[0],
                                                },
                                            })
                                        }
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>5 min</span>
                                        <span>30 min</span>
                                        <span>60 min</span>
                                        <span>120 min</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => handleSaveSettings('généraux')}
                                disabled={isSaving}
                            >
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
                    </Card>
                </TabsContent>

                {/* Paramètres de notifications */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Bell className="mr-2 h-5 w-5" />
                                Paramètres de notifications
                            </CardTitle>
                            <CardDescription>
                                Configurez comment et quand vous souhaitez être
                                notifié
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Notifications dans l'application
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="newArticles">
                                            Nouveaux articles
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Afficher une notification pour les
                                            nouveaux articles
                                        </p>
                                    </div>
                                    <Switch
                                        id="newArticles"
                                        checked={
                                            formData.notifications.newArticles
                                        }
                                        onCheckedChange={(checked) =>
                                            setFormData({
                                                ...formData,
                                                notifications: {
                                                    ...formData.notifications,
                                                    newArticles: checked,
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="newArticlesSound">
                                            Son de notification
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Jouer un son lors de la réception de
                                            nouveaux articles
                                        </p>
                                    </div>
                                    <Switch
                                        id="newArticlesSound"
                                        checked={
                                            formData.notifications
                                                .newArticlesSound
                                        }
                                        onCheckedChange={(checked) =>
                                            setFormData({
                                                ...formData,
                                                notifications: {
                                                    ...formData.notifications,
                                                    newArticlesSound: checked,
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Notifications par email
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="digestEmail">
                                            Résumé par email
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Recevoir un résumé des nouveaux
                                            articles par email
                                        </p>
                                    </div>
                                    <Switch
                                        id="digestEmail"
                                        checked={
                                            formData.notifications.digestEmail
                                        }
                                        onCheckedChange={(checked) =>
                                            setFormData({
                                                ...formData,
                                                notifications: {
                                                    ...formData.notifications,
                                                    digestEmail: checked,
                                                },
                                            })
                                        }
                                    />
                                </div>

                                {formData.notifications.digestEmail && (
                                    <div className="space-y-2">
                                        <Label htmlFor="digestFrequency">
                                            Fréquence du résumé
                                        </Label>
                                        <Select
                                            value={
                                                formData.notifications
                                                    .digestFrequency
                                            }
                                            onValueChange={(value) =>
                                                setFormData({
                                                    ...formData,
                                                    notifications: {
                                                        ...formData.notifications,
                                                        digestFrequency: value,
                                                    },
                                                })
                                            }
                                        >
                                            <SelectTrigger id="digestFrequency">
                                                <SelectValue placeholder="Sélectionner une fréquence" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="daily">
                                                    Quotidien
                                                </SelectItem>
                                                <SelectItem value="weekly">
                                                    Hebdomadaire
                                                </SelectItem>
                                                <SelectItem value="monthly">
                                                    Mensuel
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Notifications push
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="pushNotifications">
                                            Notifications push
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Recevoir des notifications push pour
                                            les nouveaux articles
                                        </p>
                                    </div>
                                    <Switch
                                        id="pushNotifications"
                                        checked={
                                            formData.notifications
                                                .pushNotifications
                                        }
                                        onCheckedChange={(checked) =>
                                            setFormData({
                                                ...formData,
                                                notifications: {
                                                    ...formData.notifications,
                                                    pushNotifications: checked,
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() =>
                                    handleSaveSettings('de notifications')
                                }
                                disabled={isSaving}
                            >
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
                    </Card>
                </TabsContent>

                {/* Paramètres d'affichage */}
                <TabsContent value="display">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Monitor className="mr-2 h-5 w-5" />
                                Paramètres d'affichage
                            </CardTitle>
                            <CardDescription>
                                Personnalisez l'apparence et le comportement de
                                l'interface
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="articleDensity">
                                    Densité des articles
                                </Label>
                                <RadioGroup
                                    id="articleDensity"
                                    value={formData.display.articleDensity}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            display: {
                                                ...formData.display,
                                                articleDensity: value,
                                            },
                                        })
                                    }
                                    className="flex space-x-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="compact"
                                            id="density-compact"
                                        />
                                        <Label htmlFor="density-compact">
                                            Compact
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="comfortable"
                                            id="density-comfortable"
                                        />
                                        <Label htmlFor="density-comfortable">
                                            Confortable
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="spacious"
                                            id="density-spacious"
                                        />
                                        <Label htmlFor="density-spacious">
                                            Spacieux
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="fontSize">
                                        Taille de police
                                    </Label>
                                    <span className="text-sm">
                                        {formData.display.fontSize}px
                                    </span>
                                </div>
                                <Slider
                                    id="fontSize"
                                    min={12}
                                    max={24}
                                    step={1}
                                    value={[formData.display.fontSize]}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            display: {
                                                ...formData.display,
                                                fontSize: value[0],
                                            },
                                        })
                                    }
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>12px</span>
                                    <span>16px</span>
                                    <span>20px</span>
                                    <span>24px</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Contenu des articles
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="showImages">
                                            Afficher les images
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Afficher les images dans les
                                            articles
                                        </p>
                                    </div>
                                    <Switch
                                        id="showImages"
                                        checked={formData.display.showImages}
                                        onCheckedChange={(checked) =>
                                            setFormData({
                                                ...formData,
                                                display: {
                                                    ...formData.display,
                                                    showImages: checked,
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="showSummary">
                                            Afficher les résumés
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Afficher les résumés des articles
                                            dans la liste
                                        </p>
                                    </div>
                                    <Switch
                                        id="showSummary"
                                        checked={formData.display.showSummary}
                                        onCheckedChange={(checked) =>
                                            setFormData({
                                                ...formData,
                                                display: {
                                                    ...formData.display,
                                                    showSummary: checked,
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Comportement
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="markReadOnScroll">
                                            Marquer comme lu au défilement
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Marquer automatiquement les articles
                                            comme lus lors du défilement
                                        </p>
                                    </div>
                                    <Switch
                                        id="markReadOnScroll"
                                        checked={
                                            formData.display.markReadOnScroll
                                        }
                                        onCheckedChange={(checked) =>
                                            setFormData({
                                                ...formData,
                                                display: {
                                                    ...formData.display,
                                                    markReadOnScroll: checked,
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="openLinksIn">
                                        Ouvrir les liens dans
                                    </Label>
                                    <Select
                                        value={formData.display.openLinksIn}
                                        onValueChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                display: {
                                                    ...formData.display,
                                                    openLinksIn: value,
                                                },
                                            })
                                        }
                                    >
                                        <SelectTrigger id="openLinksIn">
                                            <SelectValue placeholder="Sélectionner une option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new-tab">
                                                Nouvel onglet
                                            </SelectItem>
                                            <SelectItem value="same-tab">
                                                Même onglet
                                            </SelectItem>
                                            <SelectItem value="reader-view">
                                                Vue lecteur
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() =>
                                    handleSaveSettings("d'affichage")
                                }
                                disabled={isSaving}
                            >
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
                    </Card>
                </TabsContent>

                {/* Paramètres de données */}
                <TabsContent value="data">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Database className="mr-2 h-5 w-5" />
                                Données et stockage
                            </CardTitle>
                            <CardDescription>
                                Gérez vos données et options de stockage
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="cacheSize">
                                        Taille du cache (MB)
                                    </Label>
                                    <span className="text-sm">
                                        {formData.data.cacheSize} MB
                                    </span>
                                </div>
                                <Slider
                                    id="cacheSize"
                                    min={50}
                                    max={500}
                                    step={50}
                                    value={[formData.data.cacheSize]}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            data: {
                                                ...formData.data,
                                                cacheSize: value[0],
                                            },
                                        })
                                    }
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>50 MB</span>
                                    <span>200 MB</span>
                                    <span>350 MB</span>
                                    <span>500 MB</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="keepArticles">
                                    Conserver les articles
                                </Label>
                                <Select
                                    value={formData.data.keepArticles}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            data: {
                                                ...formData.data,
                                                keepArticles: value,
                                            },
                                        })
                                    }
                                >
                                    <SelectTrigger id="keepArticles">
                                        <SelectValue placeholder="Sélectionner une durée" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="7days">
                                            7 jours
                                        </SelectItem>
                                        <SelectItem value="30days">
                                            30 jours
                                        </SelectItem>
                                        <SelectItem value="90days">
                                            90 jours
                                        </SelectItem>
                                        <SelectItem value="forever">
                                            Indéfiniment
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="autoCleanup">
                                        Nettoyage automatique
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Nettoyer automatiquement les anciens
                                        articles
                                    </p>
                                </div>
                                <Switch
                                    id="autoCleanup"
                                    checked={formData.data.autoCleanup}
                                    onCheckedChange={(checked) =>
                                        setFormData({
                                            ...formData,
                                            data: {
                                                ...formData.data,
                                                autoCleanup: checked,
                                            },
                                        })
                                    }
                                />
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label htmlFor="exportFormat">
                                    Format d'exportation
                                </Label>
                                <Select
                                    value={formData.data.exportFormat}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            data: {
                                                ...formData.data,
                                                exportFormat: value,
                                            },
                                        })
                                    }
                                >
                                    <SelectTrigger id="exportFormat">
                                        <SelectValue placeholder="Sélectionner un format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="opml">
                                            OPML
                                        </SelectItem>
                                        <SelectItem value="json">
                                            JSON
                                        </SelectItem>
                                        <SelectItem value="xml">XML</SelectItem>
                                        <SelectItem value="csv">CSV</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={handleExportData}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Exporter les données
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={handleImportData}
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Importer des données
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => handleSaveSettings('de données')}
                                disabled={isSaving}
                            >
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
                    </Card>
                </TabsContent>

                {/* Paramètres avancés */}
                <TabsContent value="advanced">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Sliders className="mr-2 h-5 w-5" />
                                Paramètres avancés
                            </CardTitle>
                            <CardDescription>
                                Options avancées pour les utilisateurs
                                expérimentés
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="enableKeyboardShortcuts">
                                        Raccourcis clavier
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Activer les raccourcis clavier pour
                                        naviguer rapidement
                                    </p>
                                </div>
                                <Switch
                                    id="enableKeyboardShortcuts"
                                    checked={
                                        formData.advanced
                                            .enableKeyboardShortcuts
                                    }
                                    onCheckedChange={(checked) =>
                                        setFormData({
                                            ...formData,
                                            advanced: {
                                                ...formData.advanced,
                                                enableKeyboardShortcuts:
                                                    checked,
                                            },
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="enableBetaFeatures">
                                        Fonctionnalités bêta
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Activer les fonctionnalités
                                        expérimentales
                                    </p>
                                </div>
                                <Switch
                                    id="enableBetaFeatures"
                                    checked={
                                        formData.advanced.enableBetaFeatures
                                    }
                                    onCheckedChange={(checked) =>
                                        setFormData({
                                            ...formData,
                                            advanced: {
                                                ...formData.advanced,
                                                enableBetaFeatures: checked,
                                            },
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="debugMode">
                                        Mode débogage
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Activer le mode débogage pour les
                                        développeurs
                                    </p>
                                </div>
                                <Switch
                                    id="debugMode"
                                    checked={formData.advanced.debugMode}
                                    onCheckedChange={(checked) =>
                                        setFormData({
                                            ...formData,
                                            advanced: {
                                                ...formData.advanced,
                                                debugMode: checked,
                                            },
                                        })
                                    }
                                />
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label htmlFor="customCSS">
                                    CSS personnalisé
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Ajoutez du CSS personnalisé pour modifier
                                    l'apparence de l'application
                                </p>
                                <textarea
                                    id="customCSS"
                                    className="w-full min-h-[150px] p-2 border rounded-md bg-background"
                                    value={formData.advanced.customCSS}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            advanced: {
                                                ...formData.advanced,
                                                customCSS: e.target.value,
                                            },
                                        })
                                    }
                                    placeholder="/* Ajoutez votre CSS personnalisé ici */"
                                />
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <h3 className="text-lg font-medium text-destructive">
                                    Zone de danger
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Ces actions sont irréversibles. Procédez
                                    avec prudence.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                className="flex-1"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Réinitialiser tous les
                                                paramètres
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Êtes-vous absolument sûr?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Cette action ne peut pas
                                                    être annulée. Cela
                                                    réinitialisera tous vos
                                                    paramètres aux valeurs par
                                                    défaut.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Annuler
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={
                                                        handleResetSettings
                                                    }
                                                >
                                                    Réinitialiser
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                className="flex-1"
                                            >
                                                <Shield className="mr-2 h-4 w-4" />
                                                Supprimer toutes les données
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Êtes-vous absolument sûr?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Cette action ne peut pas
                                                    être annulée. Cela
                                                    supprimera définitivement
                                                    toutes vos données et
                                                    abonnements.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Annuler
                                                </AlertDialogCancel>
                                                <AlertDialogAction className="bg-destructive">
                                                    Supprimer
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => handleSaveSettings('avancés')}
                                disabled={isSaving}
                            >
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
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
