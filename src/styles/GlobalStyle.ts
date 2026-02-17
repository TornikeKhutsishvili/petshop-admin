import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: #f8f9fa;
    min-height: 100vh;
    color: #2d3748;
    font-weight: 400;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
  }

  @media (max-width: 768px) {
    .container {
      padding: 20px 16px;
    }

    .header {
      padding: 24px;
    }

    .header h1 {
      font-size: 2.2rem;
    }

    .nav-tabs {
      flex-direction: column;
      gap: 8px;
    }

    .pet-detail-header {
      flex-direction: column;
      gap: 24px;
    }

    .pet-detail-image {
      width: 100%;
      height: 250px;
    }

    .pet-detail-prices {
      flex-direction: column;
      gap: 16px;
    }

    .action-bar {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }
  }
`;
