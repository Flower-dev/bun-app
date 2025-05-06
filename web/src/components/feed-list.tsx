import { Loader2, Rss } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Feed {
    id: string
    title: string
    url: string
    unreadCount: number
}

interface FeedListProps {
    feeds: Feed[]
    isLoading: boolean
    selectedFeedId: string | null
    onSelectFeed: (id: string) => void
}

export function FeedList({
    feeds,
    isLoading,
    selectedFeedId,
    onSelectFeed,
}: FeedListProps) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        )
    }

    if (feeds.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center">
                <Rss className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Aucun flux trouvé</h3>
                <p className="text-sm text-muted-foreground mt-2">
                    Ajoutez des flux RSS pour commencer
                </p>
            </div>
        )
    }

    return (
        <ScrollArea className="h-[400px]">
            <div className="space-y-1">
                {feeds.map((feed) => (
                    <Button
                        key={feed.id}
                        variant="ghost"
                        className={cn(
                            'w-full justify-start font-normal',
                            selectedFeedId === feed.id && 'bg-accent'
                        )}
                        onClick={() => onSelectFeed(feed.id)}
                    >
                        <div className="flex items-center justify-between w-full">
                            <span className="truncate">{feed.title}</span>
                            {feed.unreadCount > 0 && (
                                <Badge variant="secondary" className="ml-2">
                                    {feed.unreadCount}
                                </Badge>
                            )}
                        </div>
                    </Button>
                ))}
            </div>
        </ScrollArea>
    )
}
