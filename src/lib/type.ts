export interface EventItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  location: string;
  eventDate: string;
  endDate: string;
  creatorId: string;
  status: string;
  createdAt: string;
}


export interface EventParticipant {
  _id: string;
  name: string;
}

export interface EventDetails {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  eventDate: string;
  eventTime: string;

  // If createdBy is null, the event was created by the ServeUp team.
  createdBy?: {
    name: string;
    email?: string;
  } | null;

  // Participant images are intentionally not included.
  participants: EventParticipant[];
}
