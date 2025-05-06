import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus, Rss } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FeedList } from '@/components/feed-list'
import { FeedArticles } from '@/components/feed-articles'
import { AddFeedDialog } from '@/components/add-feed-dialog'

// Simuler une API pour récupérer les flux RSS
const fetchFeeds = async () => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return [
        {
            id: '1',
            title: 'Le Monde',
            url: 'https://www.lemonde.fr/rss/une.xml',
            unreadCount: 5,
        },
        {
            id: '2',
            title: 'The Verge',
            url: 'https://www.theverge.com/rss/index.xml',
            unreadCount: 12,
        },
        {
            id: '3',
            title: 'Hacker News',
            url: 'https://news.ycombinator.com/rss',
            unreadCount: 8,
        },
        {
            id: '4',
            title: 'BBC News',
            url: 'http://feeds.bbci.co.uk/news/rss.xml',
            unreadCount: 3,
        },
    ]
}

export default function DashboardPage() {
    const [selectedFeed, setSelectedFeed] = useState<string | null>(null)
    const [isAddFeedOpen, setIsAddFeedOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const {
        data: feeds = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['feeds'],
        queryFn: fetchFeeds,
    })

    const filteredFeeds = feeds.filter((feed) =>
        feed.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Flux RSS
                    </h1>
                    <p className="text-muted-foreground">
                        Gérez et consultez vos flux RSS favoris
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Mes flux</CardTitle>
                        <CardDescription>
                            {feeds.length} flux RSS abonnés
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Input
                                placeholder="Rechercher un flux..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FeedList
                                feeds={filteredFeeds}
                                isLoading={isLoading}
                                selectedFeedId={selectedFeed}
                                onSelectFeed={(id) => setSelectedFeed(id)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setIsAddFeedOpen(true)}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter un flux
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>
                            {selectedFeed
                                ? feeds.find((f) => f.id === selectedFeed)
                                      ?.title || 'Articles'
                                : 'Articles'}
                        </CardTitle>
                        <CardDescription>
                            {selectedFeed
                                ? `Articles de ${feeds.find((f) => f.id === selectedFeed)?.title}`
                                : 'Sélectionnez un flux pour voir les articles'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {selectedFeed ? (
                            <Tabs defaultValue="unread">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="unread">
                                        Non lus
                                    </TabsTrigger>
                                    <TabsTrigger value="all">Tous</TabsTrigger>
                                    <TabsTrigger value="saved">
                                        Sauvegardés
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="unread">
                                    <FeedArticles
                                        feedId={selectedFeed}
                                        filter="unread"
                                    />
                                </TabsContent>
                                <TabsContent value="all">
                                    <FeedArticles
                                        feedId={selectedFeed}
                                        filter="all"
                                    />
                                </TabsContent>
                                <TabsContent value="saved">
                                    <FeedArticles
                                        feedId={selectedFeed}
                                        filter="saved"
                                    />
                                </TabsContent>
                            </Tabs>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Rss className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium">
                                    Aucun flux sélectionné
                                </h3>
                                <p className="text-muted-foreground mt-2">
                                    Sélectionnez un flux dans la liste pour voir
                                    ses articles
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <AddFeedDialog
                open={isAddFeedOpen}
                onOpenChange={setIsAddFeedOpen}
                onAddFeed={() => {
                    // Simuler l'ajout d'un flux
                    refetch()
                }}
            />
        </div>
    )
}
