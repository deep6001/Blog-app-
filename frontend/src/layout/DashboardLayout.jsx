import Sidebar from "../components/Sidebar";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>

      <div className="flex min-h-screen  w-full">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Area */}
        <div className="flex flex-1 flex-col">

          {/* Top Bar (Mobile Toggle) */}
          <header className="h-14 border-b bg-background flex items-center px-4 ">

            <SidebarTrigger className="mr-2" />

            <h1 className="font-semibold">
              Mini Blog
            </h1>

          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">

            <div className="max-w-5xl mx-auto">
              {children}
            </div>

          </main>

        </div>

      </div>

    </SidebarProvider>
  );
}
