import ProfileBadge from "./_components/profile-badge";
import Sidebar from "./_components/sidebar";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="w-full lg:flex">
        <div className="hidden lg:block basis-[250px] h-screen"></div>
        <div className="lg:flex-auto min-h-screen bg-secondary p-4 transition-all">
          <div className="max-w-7xl mx-auto space-y-10">
            <ProfileBadge />
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout