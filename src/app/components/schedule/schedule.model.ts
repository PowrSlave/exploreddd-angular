export interface Speaker {
  fullName: string,
  tagLine: string,
  bio: string,
  profilePicture: string
}

export interface Session {
  title: string,
  description: string,
  format: string,
  startsAt: string,
  endsAt: string,
  prettyStartDay: string,
  pixelHeight?: string,
  pixelMarginBottom?: string,
  track: string,
  isServiceSession: boolean,
  speaker: Speaker
}


