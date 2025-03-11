import { useState } from 'react'
import { Outlet } from 'react-router-dom'
// import { MainNav } from "@/components/main-nav"
import { MobileNav } from '@/components/mobile-nav'
import { ModeToggle } from '@/components/mode-toggle'
import { Sidebar } from '@/components/ui/sidebar'
import { useMobile } from '@/hooks/use-mobile'
import { UserNav } from '@/components/user-nav'

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const isMobile = useMobile()
    // <MainNav />
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 ">
                <div className="container flex h-16 items-center justify-between py-4">
                    {isMobile ? (
                        <MobileNav onOpenSidebar={() => setSidebarOpen(true)} />
                    ) : null}
                    <div className="flex items-center gap-2">
                        <ModeToggle />
                        <UserNav />
                    </div>
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
