export interface IRawBcastDetail {
    id: string;
    created_at: string;
    expires_at: string;
    max_users: number;
    tag: string[];
    content: string;
    title: string;
    explicit: boolean;
    user_id: string;
    location: string;
    hide_position: boolean;
    dist_meters: number;
    joined_users: number;
    joined: boolean;
  }
  