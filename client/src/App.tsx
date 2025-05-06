import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { AppTable } from "./components/app-table";
import { FilePlus, FilePlus2 } from "lucide-react";
import { FileUpload } from "./components/file-upload";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />

      <div className="min-h-screen p-4 bg-background w-full text-foreground">
        <h1 className="text-4xl font-bold text-center">VaultDrop</h1>

        <div className="flex flex-col mt-10">
          <AppTable />
        </div>

        <div className="absolute bottom-4 right-4">
          <FileUpload />
        </div>

        {/* <Button className="absolute bottom-4 right-4 text-primary-foreground bg-primary p-2 rounded-full shadow-md hover:bg-primary/90 transition-colors w-18 h-18">
          <FilePlus2 className="w-22 h-22" />
        </Button> */}
      </div>
    </SidebarProvider>
  );
}

export default App;
