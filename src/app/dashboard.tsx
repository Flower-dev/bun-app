import Layout from '@/components/layouts/layout'
import { ArticleCard } from '@/components/article-card'
import { MOCK_ARTICLES } from '@/mock/articles'

const Dashboard = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-6">Feed</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
                {MOCK_ARTICLES.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </section>
        </Layout>
    )
}

export default Dashboard
