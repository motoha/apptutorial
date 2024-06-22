 

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Fotter from "./components/Footer/Index";
import { CartProvider } from "./components/Shop/shop_context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { CartProviderx } from "./context/CartContext";
import { ContextProvider } from "./context/AppContext";
 

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">

<ReactQueryProvider>
      <body  >
      <ContextProvider>
      <CartProviderx> 
        <Header />
        {children}
        <Fotter />
      </CartProviderx> </ContextProvider>
        </body>
        </ReactQueryProvider>   
    </html>
  );
}
