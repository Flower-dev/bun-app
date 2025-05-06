import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

interface Article {
    id: string
    title: string
    description: string
    date: string
    url: string
    isRead: boolean
    isSaved: boolean
}

interface FeedArticlesProps {
    feedId: string
    filter: 'all' | 'unread' | 'saved'
}

// Simuler une API pour récupérer les articles d'un flux
const fetchArticles = async (feedId: string, filter: string) => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const articles: Article[] = [
        {
            id: '1',
            title: 'Les dernières avancées en intelligence artificielle',
            description:
                "Découvrez les dernières innovations dans le domaine de l'IA et comment elles transforment notre quotidien.",
            date: '2023-05-15T10:30:00Z',
            url: 'https://example.com/article1',
            isRead: false,
            isSaved: true,
        },
        {
            id: '2',
            title: 'Comment optimiser votre workflow de développement',
            description:
                'Apprenez les meilleures pratiques pour améliorer votre productivité en tant que développeur.',
            date: '2023-05-14T08:45:00Z',
            url: 'https://example.com/article2',
            isRead: true,
            isSaved: false,
        },
        {
            id: '3',
            title: 'Les tendances web design pour 2023',
            description:
                'Découvrez les tendances qui façonnent le web design cette année et comment les intégrer dans vos projets.',
            date: '2023-05-13T14:20:00Z',
            url: 'https://example.com/article3',
            isRead: false,
            isSaved: false,
        },
        {
            id: '4',
            title: 'Introduction à React 18',
            description:
                'Tout ce que vous devez savoir sur les nouvelles fonctionnalités de React 18 et comment les utiliser.',
            date: '2023-05-12T09:15:00Z',
            url: 'https://example.com/article4',
            isRead: true,
            isSaved: true,
        },
        {
            id: '5',
            title: 'Le futur du développement web',
            description:
                "Explorez les technologies émergentes qui vont façonner l'avenir du développement web.",
            date: '2023-05-11T16:40:00Z',
            url: 'https://example.com/article5',
            isRead: false,
            isSaved: false,
        },
    ]

    // Filtrer les articles selon le filtre sélectionné
    if (filter === 'unread') {
        return articles.filter((article) => !article.isRead)
    } else if (filter === 'saved') {
        return articles.filter((article) => article.isSaved)
    }

    return articles
}

export function FeedArticles({ feedId, filter }: FeedArticlesProps) {
    const [articles, setArticles] = useState<Article[]>([])

    const { data, isLoading } = useQuery({
        queryKey: ['articles', feedId, filter],
        queryFn: () => fetchArticles(feedId, filter),
        onSuccess: (data) => setArticles(data),
    })

    const toggleSaved = (articleId: string) => {
        setArticles((prev) =>
            prev.map((article) =>
                article.id === articleId
                    ? { ...article, isSaved: !article.isSaved }
                    : article
            )
        )
    }

    const markAsRead = (articleId: string) => {
        setArticles((prev) =>
            prev.map((article) =>
                article.id === articleId
                    ? { ...article, isRead: true }
                    : article
            )
        )
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        )
    }

    if (!articles || articles.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">Aucun article trouvé</p>
            </div>
        )
    }

    return (
        <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
                {articles.map((article) => (
                    <Card
                        key={article.id}
                        className={article.isRead ? 'opacity-70' : ''}
                    >
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold">
                                {article.title}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">
                                {formatDate(article.date)}
                            </p>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <p className="text-sm">{article.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2">
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleSaved(article.id)}
                                >
                                    {article.isSaved ? (
                                        <>
                                            <BookmarkCheck className="h-4 w-4 mr-1" />
                                            Sauvegardé
                                        </>
                                    ) : (
                                        <>
                                            <Bookmark className="h-4 w-4 mr-1" />
                                            Sauvegarder
                                        </>
                                    )}
                                </Button>
                                {!article.isRead && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => markAsRead(article.id)}
                                    >
                                        Marquer comme lu
                                    </Button>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary"
                                onClick={() => {
                                    window.open(article.url, '_blank')
                                    if (!article.isRead) {
                                        markAsRead(article.id)
                                    }
                                }}
                            >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Lire
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    )
}
