import { FC, ReactNode } from "react";
import "~/styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover and share AI Prompts",
};

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => (
  <html lang="en">
    <body>
      <div className="main">
        <div className="gradient" />
      </div>

      <main className="app">
        {children}
      </main>
    </body>
  </html>
);

export default RootLayout;
