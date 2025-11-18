
export interface Media {
  id: string;
  title: string;
  synopsis: string;
  year: number;
  posterUrl: string;
  bannerUrl: string;
  genres: Genre[];
  tags: Tag[];
  cast: string[];
  director: string;
  rating: string;
}

export interface Movie extends Media {
  type: 'movie';
  duration: number; // in minutes
  videoUrl: string;
}

export interface Episode {
  id: string;
  title: string;
  synopsis: string;
  thumbnailUrl: string;
  videoUrl: string;
  episodeNumber: number;
}

export interface Season {
  id: string;
  seasonNumber: number;
  episodes: Episode[];
}

export interface Series extends Media {
  type: 'series';
  seasons: Season[];
}

export interface Genre {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Channel {
  id: string;
  name: string;
  logoUrl: string;
  videoUrl: string;
}

export interface ContentShelf {
  id: string;
  title: string;
  items: (Movie | Series)[];
}
