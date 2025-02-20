import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

const RssLandingPage = () => {
    const handleLoginRedirect = () => {
        window.location.href = '/auth'
    }

    const handleGithubRedirect = () => {
        window.open('https://github.com/Flower-dev/bun-app', '_blank')
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            {/* Hero Section */}
            <h1 className="text-9xl font-extrabold mb-6 bg-gradient-to-r from-amber-600 to-purple-900 text-transparent bg-clip-text animate-fade-in">
                Votre Contenu. Votre Flow.
            </h1>
            <p className="text-gray-700 text-xl max-w-2xl mx-auto leading-relaxed">
                Centralisez tous vos flux RSS en un seul endroit. Une expérience
                moderne et intuitive pour suivre vos sources préférées.
            </p>
            <div className="flex gap-6 justify-center mt-10">
                <Button
                    size="lg"
                    className="bg-purple-950 shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105 px-6 py-3"
                    onClick={handleLoginRedirect}
                >
                    Start now
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className="border-grey-300 text-purple-950 hover:bg-purple-100 transition-transform transform hover:scale-105 px-6 py-3 "
                    onClick={handleGithubRedirect}
                >
                    <Github className="mr-2" size={18} />
                    Voir sur GitHub
                </Button>
            </div>

            {/* Footer */}
            <footer className="mt-16 text-gray-500 text-sm">
                <p>Made with ♥️ by Flower Dev</p>
            </footer>
        </div>
    )
}

export default RssLandingPage
