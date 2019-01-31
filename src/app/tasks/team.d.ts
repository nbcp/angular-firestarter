interface Team {
  id: string;
  name: string;
  lead?: string;
  memberCount: number;
}

interface TeamApplication {
  teamid: string;
}