export interface IRawBcast {
  id?: string;
  user_id: string;
  created_at: string;
  expires_at: string | Date;
  tag: string[];
  title: string;
  content: string;
  explicit: boolean;
  location: string;
  max_users: number;
}

