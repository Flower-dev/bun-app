import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Rss,
    ArrowRight,
    Github,
    Newspaper,
    Layout,
    Bell,
    Tag,
    Download,
    Share2,
} from 'lucide-react'

const RssLandingPage = () => {
    const [isHovered, setIsHovered] = useState(false)

    const handleLoginRedirect = () => {
        window.location.href = '/auth'
    }

    const handleGithubRedirect = () => {
        window.location.href = 'https://github.com/Flower-dev/bun-app'
    }

    return (
        <div className="min-h-screen ">
            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-blue-600 text-transparent bg-clip-text">
                        Votre Contenu. Votre Flow.
                    </h1>
                    <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                        Centralisez tous vos flux RSS en un seul endroit. Une
                        expérience moderne et intuitive pour suivre vos sources
                        préférées.
                    </p>
                    <div className="flex gap-4 justify-center mb-12">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-300 to-blue-400 text-transparent bg-clip-text"
                            onClick={handleLoginRedirect}
                        >
                            Start now
                            <ArrowRight
                                className="ml-2 bg-gradient-to-r from-orange-300 to-blue-400 text-transparent bg-clip-text"
                                size={16}
                            />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="transform transition hover:scale-105"
                            onClick={handleGithubRedirect}
                        >
                            <Github className="mr-2" size={16} />
                            Voir sur GitHub
                        </Button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            icon: (
                                <Bell className="text-orange-500" size={32} />
                            ),
                            title: 'Notifications en temps réel',
                            description:
                                'Soyez alerté instantanément des nouvelles publications',
                        },
                        {
                            icon: (
                                <Layout className="text-blue-500" size={32} />
                            ),
                            title: 'Interface personnalisable',
                            description:
                                'Organisez votre feed reader comme vous le souhaitez',
                        },
                        {
                            icon: <Tag className="text-green-500" size={32} />,
                            title: 'Tags intelligents',
                            description:
                                'Catégorisez automatiquement vos articles',
                        },
                        {
                            icon: (
                                <Share2 className="text-purple-500" size={32} />
                            ),
                            title: 'Partage facile',
                            description:
                                'Partagez vos articles préférés en un clic',
                        },
                        {
                            icon: (
                                <Download
                                    className="text-indigo-500"
                                    size={32}
                                />
                            ),
                            title: 'Export OPML',
                            description: 'Exportez vos flux au format standard',
                        },
                        {
                            icon: <Rss className="text-pink-500" size={32} />,
                            title: 'Multi-formats',
                            description: 'Compatible RSS, Atom et JSON Feed',
                        },
                    ].map((feature, index) => (
                        <Card
                            key={index}
                            className="border-2 border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-center">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-center">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {[
                    'React',
                    'TailwindCSS',
                    'shadcn/ui',
                    'GitHub Actions',
                    'Bun',
                    'Elysia.js',
                ].map((tech) => (
                    <Badge
                        key={tech}
                        variant="secondary"
                        className="text-sm px-4 py-2 transition-all hover:scale-110"
                    >
                        {tech}
                    </Badge>
                ))}

                {/* Footer */}
                <footer className="text-center text-gray-600 mt-20">
                    <p>Made with ❤️</p>
                </footer>
            </div>
        </div>
    )
}

export default RssLandingPage
