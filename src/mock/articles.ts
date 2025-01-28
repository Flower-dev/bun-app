import { Article } from '@/types/article'

export const MOCK_ARTICLES: Article[] = [
    {
        id: '1',
        title: 'Introduction to React Server Components',
        description:
            "Learn how React Server Components work and how they can improve your application's performance",
        link: 'https://example.com/react-server-components',
        pubDate: '2024-01-26',
        source: 'React Blog',
        author: 'Dan Abramov',
        tags: ['React', 'Performance', 'Web Development'],
        imageUrl: '/api/placeholder/800/400',
    },
    {
        id: '2',
        title: 'Understanding TypeScript Generic Types',
        description:
            'A deep dive into TypeScript generics and how to use them effectively in your projects',
        link: 'https://example.com/typescript-generics',
        pubDate: '2024-01-25',
        source: 'TypeScript Weekly',
        author: 'Anders Hejlsberg',
        tags: ['TypeScript', 'Programming', 'JavaScript'],
        imageUrl: '/api/placeholder/800/400',
    },
    {
        id: '3',
        title: 'Mastering Tailwind CSS Grid',
        description:
            'Learn how to create complex layouts using Tailwind CSS grid system',
        link: 'https://example.com/tailwind-grid',
        pubDate: '2024-01-24',
        source: 'CSS Tricks',
        author: 'Sarah Drasner',
        tags: ['CSS', 'Tailwind', 'Web Design'],
        imageUrl: '/api/placeholder/800/400',
    },
]
