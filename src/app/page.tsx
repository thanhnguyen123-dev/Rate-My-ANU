import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LandingHero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { Stats } from "@/components/landing/stats";
import { CallToAction } from "@/components/landing/cta";
import { NavigationBar } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return redirect("/courses");
  }

  return (
  
    <div className="flex flex-col min-h-screen overflow-hidden">
      <NavigationBar />
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