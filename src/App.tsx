import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router/router";
import "./styles/GlobalStyle";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

function App() {
  const browserRouter = createBrowserRouter(router);

  return (
    <Container>
      <RouterProvider router={browserRouter} />
    </Container>
  );
}

export default App;
