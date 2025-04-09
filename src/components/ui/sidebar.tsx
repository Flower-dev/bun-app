'use client'

import { useNavigate, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Rss, LayoutDashboard, BookOpen, Compass, User } from 'lucide-react'

interface SidebarProps {
    open: boolean
    onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
    const navigate = useNavigate()
    const location = useLocation()

    const routes = [
        {
            href: '/dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
            active: location.pathname === '/dashboard',
        },
        {
            href: '/feeds',
            label: 'Feeds',
            icon: BookOpen,
            active: location.pathname === '/feeds',
        },
        {
            href: '/discover',
            label: 'Discover',
            icon: Compass,
            active: location.pathname === '/discover',
        },
        {
            href: '/profile',
            label: 'Profile',
            icon: User,
            active: location.pathname === '/profile',
        },
    ]

    const onNavigation = (href: string) => {
        navigate(href)
        onClose()
    }

    return (
        <>
            {/* Sidebar pour mobile (Sheet) */}
            <Sheet open={open} onOpenChange={onClose}>
                <SheetContent side="left" className="p-0">
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center">
                            <Rss className="h-5 w-5 mr-2" />
                            <span className="font-bold">RSS Feed</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-5 w-5" />
                            <span className="sr-only">Fermer</span>
                        </Button>
                    </div>
                    <ScrollArea className="h-[calc(100vh-60px)]">
                        <div className="p-4 space-y-2">
                            {routes.map((route) => (
                                <Button
                                    key={route.href}
                                    variant={
                                        route.active ? 'secondary' : 'ghost'
                                    }
                                    className="w-full justify-start"
                                    onClick={() => onNavigation(route.href)}
                                >
                                    <route.icon className="h-5 w-5 mr-3" />
                                    {route.label}
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>

            {/* Sidebar pour desktop */}
            <div className="hidden md:block w-64  bg-background h-[calc(100vh-64px)] sticky top-16">
                <ScrollArea className="h-full">
                    <div className="p-4 space-y-2">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.active ? 'secondary' : 'ghost'}
                                className="w-full justify-start"
                                onClick={() => navigate(route.href)}
                            >
                                <route.icon className="h-5 w-5 mr-3" />
                                {route.label}
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </>
    )
}
