import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Home from "./pages/Home";
import Quote from "./pages/Quote";
import SmallOrders from "./pages/SmallOrders";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Toaster />
      <Outlet />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const smallOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/small-orders",
  component: SmallOrders,
});

const quoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quote",
  component: Quote,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  smallOrdersRoute,
  quoteRoute,
]);

const router = createRouter({ routeTree, basepath: "/" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
