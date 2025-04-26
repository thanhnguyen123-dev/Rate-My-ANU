"use client";

import { api } from "@/trpc/react";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardPage() {
  const { data, isLoading } = api.hello.hello.useQuery();
  const { user } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <p>hello</p>
      <p>{data}</p>
      <p>{user?.email}</p>
    </>
  );
}
