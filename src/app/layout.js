import "@uploadthing/react/styles.css";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "@/components/ui/sonner" 
import Header from '@/components/Header';
import Footer from '@/components/Footer'



export const metadata = {
  title: "Car Marketplace",
  description: "Buy and sell cars professionaly",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header></Header>
          {children}
          <Footer></Footer>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
