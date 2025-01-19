import Layout from "@/app/layout";

const Dashboard = () => {


  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
         
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Bienvenue</h2>
          {/* Contenu du dashboard */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;