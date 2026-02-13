import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router/router";

function App() {
  const browserRouter = createBrowserRouter(router);

  return <RouterProvider router={browserRouter} />;
}

export default App;
