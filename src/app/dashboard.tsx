import Layout from '@/components/layouts/layout'
import { ArticleCard } from '@/components/article-card'
import { MOCK_ARTICLES } from '@/mock/articles'
// import { Calendar } from '@/components/ui/calendar'

const Dashboard = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-6">Feed</h1>

            <section
                className="rounded-xl bg-muted/50 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min h-full"
                aria-label="Articles feed"
            >
                {MOCK_ARTICLES.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </section>

            {/*     
            <section 
                className="rounded-xl bg-muted/50 p-4 flex w-fit h-fit"
                aria-label="Calendar"
            >
                <Calendar />
            </section> 
        */}
        </Layout>
    )
}

export default Dashboard
