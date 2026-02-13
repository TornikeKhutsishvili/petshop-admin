import React from "react";
import { FooterWrapper, FooterText } from "./Footer.styles";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterText>© {new Date().getFullYear()} Pet Shop Admin Panel</FooterText>
    </FooterWrapper>
  );
};

export default Footer;
