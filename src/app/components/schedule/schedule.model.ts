export interface Speaker {
  fullName: string,
  tagLine: string,
  bio: string,
  profilePicture: string
}

export interface Session {
  title: number,
  description: string,
  format: string,
  startsAt: string,
  endsAt: string,
  pixelHeight?: string,
  track: string,
  isServiceSession: boolean,
  speaker: Speaker
}
