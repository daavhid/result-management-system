import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider} from 'next-auth/react'
import ToastComponent from "@/toastify/toastContainer";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Result Management System",
  description: "Proess and manage results efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
        <html lang="en">
            <body className={inter.className}>
                {children}
                <ToastComponent/>
            </body>
        </html>
    </SessionProvider>
  );
}
