export interface Article {
    id: string
    title: string
    description: string
    link: string
    pubDate: string
    source: string
    author?: string
    tags?: string[]
    imageUrl?: string
}
