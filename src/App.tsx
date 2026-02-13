import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router/router";

function App() {
  return (
    <>
      <RouterProvider router={createBrowserRouter(router)} />
    </>
  );
}

export default App;
