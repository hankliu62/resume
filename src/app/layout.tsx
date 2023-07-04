import "./globals.css";
import "./components.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "刘小聪 - Web前端工程师简历 | Front-end Web Developer",
  description:
    "刘小聪的Web前端工程师简历，精通前端，涉猎后端，对前端有着浓厚的兴趣；希望能够在前端这条路上一直走下去。",
  keywords: "刘小聪，web前端工程师，个人简历，前端开发简历网站，前端工程师简历",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
