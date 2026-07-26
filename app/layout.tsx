
import "./globals.css";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const ibmPlexSansHeading = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-heading' });

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" className={cn("font-sans", inter.variable, ibmPlexSansHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right"  />
        {children}
      </body>
    </html>
  );
}
