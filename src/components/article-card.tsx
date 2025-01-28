import React from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Article } from '../types/article'

interface ArticleCardProps {
    article: Article
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
        <Card className="w-full hover:shadow-lg transition-shadow">
            <CardHeader>
                {article.imageUrl && (
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                )}
                <CardTitle className="text-xl font-bold">
                    <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600"
                    >
                        {article.title}
                    </a>
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>
                        {new Date(article.pubDate).toLocaleDateString()}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription className="mb-4">
                    {article.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                    {article.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
