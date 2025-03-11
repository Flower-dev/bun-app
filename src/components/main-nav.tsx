import { useNavigate, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Rss } from 'lucide-react'

export function MainNav() {
    const navigate = useNavigate()
    const location = useLocation()

    const routes = [
        {
            href: '/dashboard',
            label: 'Tableau de bord',
            active: location.pathname === '/dashboard',
        },
        {
            href: '/feeds',
            label: 'Mes flux',
            active: location.pathname === '/feeds',
        },
        {
            href: '/discover',
            label: 'Découvrir',
            active: location.pathname === '/discover',
        },
        {
            href: '/profile',
            label: 'Profil',
            active: location.pathname === '/profile',
        },
    ]

    return (
        <div className="flex items-center space-x-4 lg:space-x-6">
            <Button
                variant="ghost"
                className="mr-4 hidden md:flex"
                onClick={() => navigate('/dashboard')}
            >
                <Rss className="h-5 w-5 mr-2" />
                <span className="font-bold">RSS Feed</span>
            </Button>
            {routes.map((route) => (
                <Button
                    key={route.href}
                    variant="ghost"
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        route.active ? 'text-primary' : 'text-muted-foreground'
                    )}
                    onClick={() => navigate(route.href)}
                >
                    {route.label}
                </Button>
            ))}
        </div>
    )
}
