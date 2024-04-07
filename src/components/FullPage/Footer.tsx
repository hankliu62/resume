import React, { CSSProperties, ReactNode } from "react";

const Footer = ({ children }: { children: ReactNode }) => {
  const footerStyle: CSSProperties = {
    position: "fixed",
    width: "100%",
    zIndex: 1,
    bottom: "0",
  };

  return <footer style={footerStyle}>{children}</footer>;
};

export default Footer;
