export function formatSession(session: string): string[] {
  if (!session || session == "") {
    return ["Not offered"];
  }
  return session.split("/");
}