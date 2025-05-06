import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import { Home, Settings } from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from '@/components/ui/sidebar'
import { Button } from './ui/button'

const items = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: Home,
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: Settings,
    },
]

export function AppSidebar() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    // const location = useLocation()

    const handleLogout = () => {
        logout()
        navigate('/auth')
    }

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        // className={
                                        //     location.pathname === item.path
                                        //         ? 'bg-gray-100'
                                        //         : ''
                                        // }
                                    >
                                        <Link to={item.path}>
                                            <item.icon className="mr-2" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button onClick={handleLogout}>Déconnexion</Button>
            </SidebarFooter>
        </Sidebar>
    )
}
