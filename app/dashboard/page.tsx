import Overview from "./_components/overview"
import ProductList from "./_components/product-list"

function DashboardOverviewPage() {
  return (
    <div className="space-y-10">
      <Overview />
      <ProductList />
    </div>
  )
}

export default DashboardOverviewPage