import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { buildBrowserRoutes } from "./shared/routing/routes.tsx";
import mockServer from "./shared/mockServer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: 1000,
    },
  },
});

mockServer();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={buildBrowserRoutes()} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
