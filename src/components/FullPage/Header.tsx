import type { CSSProperties, ReactNode } from 'react';
import React from 'react';

const Header = ({ children }: { children: ReactNode }) => {
  const headerStyle: CSSProperties = {
    position: 'fixed',
    width: '100%',
    zIndex: 1,
    top: '0',
  };

  return <header style={headerStyle}>{children}</header>;
};

export default Header;
