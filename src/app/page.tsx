import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LandingHero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { Stats } from "@/components/landing/stats";
import { CallToAction } from "@/components/landing/cta";
import { FooterSection } from "@/components/landing/footer";
import NavbarClient from "@/components/landing/navbar-client";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Stats", link: "#stats" },
  ];
  if (user) {
    return redirect("/courses");
  }
  

  return (
  
    <div className="flex flex-col min-h-screen overflow-hidden">
      <NavbarClient items={navItems} />
      <main>
        <LandingHero />
        <Features />
        <Testimonials />
        <Stats />
        <CallToAction />
      </main>
      <FooterSection />
    </div>
  );
}