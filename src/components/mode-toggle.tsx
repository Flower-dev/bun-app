import React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '../context/themeContext'

const THEME_CONFIG = [
    {
        value: 'light',
        label: 'Light',
        icon: Sun,
    },
    {
        value: 'dark',
        label: 'Dark',
        icon: Moon,
    },
    {
        value: 'system',
        label: 'System',
        icon: Monitor,
    },
]

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="flex items-center gap-2"
                >
                    {React.createElement(
                        THEME_CONFIG.find((t) => t.value === theme)?.icon ||
                            Sun,
                        { className: 'h-[1.2rem] w-[1.2rem]' }
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {THEME_CONFIG.map(({ value, label, icon: Icon }) => (
                    <DropdownMenuItem
                        key={value}
                        onClick={() => setTheme(value)}
                        className={theme === value ? 'bg-accent' : ''}
                    >
                        <Icon className="mr-2 h-4 w-4" /> {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
