import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes";
import useThemeSwitchStore from "./stores/ThemeSwitchStore";
import { cn } from "./utils/cn";

const queryClient = new QueryClient();


function App() {
  const { isDark } = useThemeSwitchStore();
  return (
    <QueryClientProvider client={queryClient}>
      <main className={cn('text-foreground bg-background',
        {
          'dark': isDark,
          'light': !isDark,
        }
      )}>
        <RouterProvider router={router}/>
      </main>
    </QueryClientProvider>
  )
}

export default App
