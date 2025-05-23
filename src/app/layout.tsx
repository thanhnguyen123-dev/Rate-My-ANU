import "@/styles/globals.css";

import { type Metadata } from "next";
import { Figtree } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { createClient } from "@/utils/supabase/server";
import { AuthProvider } from "@/contexts/auth-context";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "RateMyANU",
  description: "A social platform that allows ANU students to review courses.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const font = Figtree({
  weight: ['400'],
  subsets: ['latin'],
  display: 'auto',
})

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
    <html lang="en" className={`${font.className}`}>
      <body>
        <TRPCReactProvider>
          <AuthProvider user={user}>
            { user ? (
              <SidebarLayout>
                {children}
              </SidebarLayout>
            ) : (
              <>{children}</>
            )}
          </AuthProvider>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
