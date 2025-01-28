import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar.tsx'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="px-8 w-screen h-screen bg-background">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
