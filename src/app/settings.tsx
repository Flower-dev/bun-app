import { useState } from 'react'
import Layout from '@/components/layouts/layout'
import { useAuth } from '@/context/authContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Bell, User, Shield, Palette, Globe } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/hooks/use-toast'
import { ModeToggle } from '@/components/mode-toggle'
import Language from '@/components/languages'

interface NotificationSetting {
    id: string
    title: string
    description: string
    enabled: boolean
}

interface UserProfile {
    fullName: string
    email: string
    avatar?: string
}

const Settings = () => {
    const { user } = useAuth()
    const [profile, setProfile] = useState<UserProfile>({
        fullName: user?.name || '',
        email: user?.email || '',
        avatar: user?.avatar,
    })

    const [notifications, setNotifications] = useState<NotificationSetting[]>([
        {
            id: 'email',
            title: 'Email Notifications',
            description: 'Receive email notifications for important updates',
            enabled: true,
        },
        {
            id: 'push',
            title: 'Push Notifications',
            description: 'Receive push notifications on your devices',
            enabled: false,
        },
        {
            id: 'marketing',
            title: 'Marketing Emails',
            description: 'Receive marketing and promotional emails',
            enabled: false,
        },
    ])

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
            title: 'Profile Updated',
            description: 'Your profile changes have been saved successfully.',
        })
    }

    const toggleNotification = (id: string) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id
                    ? { ...notification, enabled: !notification.enabled }
                    : notification
            )
        )
    }

    return (
        <Layout>
            <div className="container mx-auto py-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Settings</h1>
                </div>

                <Tabs defaultValue="profile" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
                        <TabsTrigger
                            value="profile"
                            className="flex items-center gap-2"
                        >
                            <User className="h-4 w-4" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="notifications"
                            className="flex items-center gap-2"
                        >
                            <Bell className="h-4 w-4" />
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="flex items-center gap-2"
                        >
                            <Shield className="h-4 w-4" />
                            Security
                        </TabsTrigger>
                        <TabsTrigger
                            value="preferences"
                            className="flex items-center gap-2"
                        >
                            <Palette className="h-4 w-4" />
                            Preferences
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your personal information and profile
                                    settings
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleProfileUpdate}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage
                                                src={profile.avatar}
                                                alt={profile.fullName}
                                            />
                                            <AvatarFallback>
                                                {profile.fullName.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Button variant="outline">
                                            Change Avatar
                                        </Button>
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="grid gap-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="fullName"
                                                className="text-right"
                                            >
                                                Full Name
                                            </Label>
                                            <Input
                                                id="fullName"
                                                value={profile.fullName}
                                                onChange={(e) =>
                                                    setProfile({
                                                        ...profile,
                                                        fullName:
                                                            e.target.value,
                                                    })
                                                }
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="email"
                                                className="text-right"
                                            >
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) =>
                                                    setProfile({
                                                        ...profile,
                                                        email: e.target.value,
                                                    })
                                                }
                                                className="col-span-3"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button onClick={handleProfileUpdate}>
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>
                                    Manage how you receive notifications and
                                    updates
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className="flex items-center justify-between space-x-4"
                                    >
                                        <div>
                                            <h4 className="font-medium">
                                                {notification.title}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {notification.description}
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notification.enabled}
                                            onCheckedChange={() =>
                                                toggleNotification(
                                                    notification.id
                                                )
                                            }
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>
                                    Manage your security preferences and
                                    two-factor authentication
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">
                                                Two-Factor Authentication
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                Add an extra layer of security
                                                to your account
                                            </p>
                                        </div>
                                        <Switch />
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 className="font-medium mb-2">
                                            Password
                                        </h4>
                                        <Button variant="outline">
                                            Change Password
                                        </Button>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 className="font-medium mb-2">
                                            Active Sessions
                                        </h4>
                                        <div className="rounded-lg border p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">
                                                        Current Browser
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Last active: Just now
                                                    </p>
                                                </div>
                                                <Badge>Active</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="preferences">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preferences</CardTitle>
                                <CardDescription>
                                    Customize your application experience
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">
                                                Dark Mode
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                Toggle dark mode theme
                                            </p>
                                        </div>
                                        <ModeToggle />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">
                                                Language
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                Select your preferred language
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <Language />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    )
}

export default Settings
