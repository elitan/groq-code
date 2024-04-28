import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "j4pp",
  description: "Created by j4pp",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <html lang="en" data-color-mode="dark">
      <body className={`font-sans ${inter.variable} bg-zinc-900 text-zinc-100`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <div>{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
