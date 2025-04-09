import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MobileNav } from '@/components/mobile-nav'
import { ModeToggle } from '@/components/mode-toggle'
import { Sidebar } from '@/components/ui/sidebar'
import { useMobile } from '@/hooks/use-mobile'
import { UserNav } from '@/components/user-nav'

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const isMobile = useMobile()

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 flex items-center justify-between h-16 py-4 pr-8">
                {isMobile ? (
                    <MobileNav onOpenSidebar={() => setSidebarOpen(true)} />
                ) : null}

                <div className="flex-grow" />
                <div className="flex items-center gap-2 ml-auto">
                    <ModeToggle />
                    <UserNav />
                </div>
            </header>
            <div className="flex flex-1">
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
                <main className="flex-1 p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
