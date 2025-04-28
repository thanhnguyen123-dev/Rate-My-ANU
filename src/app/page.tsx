import { HydrateClient } from "@/trpc/server";
import { createClient } from "@/utils/supabase/server";
import TryoutButton from "@/components/ui/tryout-button";
import CoursesGrid from "@/components/dashboard/courses-grid";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return redirect("/courses");
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col gap-2 items-center justify-center">
        <p>Landing page</p>
        <TryoutButton />
      </main>
    </HydrateClient>
  );
  
}