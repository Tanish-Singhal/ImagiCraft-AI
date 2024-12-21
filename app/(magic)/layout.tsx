import React from "react";
import Header from "./Header";

function MagicLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default MagicLayout;