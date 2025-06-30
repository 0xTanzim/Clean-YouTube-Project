// Video bookmark types
export interface VideoBookmark {
  id: string;
  videoId: string;
  playlistId: string;
  timestamp: number; // in seconds
  title: string;
  note?: string;
  createdAt: number;
  updatedAt: number;
  tags?: string[];
}

export interface BookmarkCollection {
  [videoId: string]: VideoBookmark[];
}

export interface BookmarkStats {
  totalBookmarks: number;
  totalPlaylistBookmarks: number;
  uniqueTags: string[];
  averagePerVideo: number;
}
