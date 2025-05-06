export function formatSession(session: string): string[] {
  if (!session || session.length === 0) {
    return ["Not offered"];
  }
  
  const sessionMap: Record<string, number> = {
    "1st Sem": 1,
    "2nd Sem": 2,
    "Spring": 3,
    "Summer": 4,
    "Autumn": 5,
    "Winter": 6
  };
  
  const formattedSessions = session.split("/").map(session => {
    if (session.includes("First")) {
      return "1st Sem";
    } else if (session.includes("Second")) {
      return "2nd Sem";
    } else if (session.includes("Session")) {
      return session.split(" ")[0];
    }
    return session;
  });
  
  const filteredSessions = formattedSessions.filter((session): session is string => 
    session !== undefined
  );
  
  return filteredSessions.sort((a, b) => {
    const orderA = sessionMap[a] ?? 999; 
    const orderB = sessionMap[b] ?? 999;
    return orderA - orderB;
  });
}