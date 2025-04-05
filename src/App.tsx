import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes";
import useThemeSwitchStore from "./stores/ThemeSwitchStore";
import { useEffect } from "react";

const queryClient = new QueryClient();

const html = document.getElementsByTagName("html")[0];

function App() {
  const { isDark } = useThemeSwitchStore();

  useEffect (()=> {
    if (isDark){
        html.classList.remove("light")
        html.classList.add("dark")
    } else {
        html.classList.remove("dark")
        html.classList.add("light")
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <main className="text-foreground bg-background">
        <RouterProvider router={router}/>
      </main>
    </QueryClientProvider>
  )
}

export default App
