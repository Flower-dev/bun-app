import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Rss } from 'lucide-react'

interface MobileNavProps {
    onOpenSidebar: () => void
}

export function MobileNav({ onOpenSidebar }: MobileNavProps) {
    return (
        <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onOpenSidebar}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
            </Button>
            <div className="flex items-center ml-2">
                <Rss className="h-5 w-5 mr-2" />
                <span className="font-bold">RSS Feed</span>
            </div>
        </div>
    )
}
