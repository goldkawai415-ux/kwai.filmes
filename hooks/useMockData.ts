
import { useState, useCallback } from 'react';
import { Movie, Series, Genre, Tag, ContentShelf } from '../types';

// Mock Data
const genres: Genre[] = [
  { id: 'g1', name: 'Ação' },
  { id: 'g2', name: 'Comédia' },
  { id: 'g3', name: 'Drama' },
  { id: 'g4', name: 'Ficção Científica' },
  { id: 'g5', name: 'Terror' },
  { id: 'g6', name: 'Documentário' },
];

const tags: Tag[] = [
  { id: 't1', name: 'Lançamento' },
  { id: 't2', name: 'HD' },
  { id: 't3', name: '4K' },
  { id: 't4', name: 'Exclusivo' },
];

const mockMovies: Movie[] = Array.from({ length: 12 }, (_, i) => ({
  id: `m${i + 1}`,
  type: 'movie',
  title: `Filme de Aventura ${i + 1}`,
  synopsis: `Uma emocionante aventura através de selvas desconhecidas em busca de um tesouro perdido. O filme ${i + 1} explora temas de coragem e amizade.`,
  year: 2023 - (i % 5),
  posterUrl: `https://picsum.photos/seed/movie${i}/400/600`,
  bannerUrl: `https://picsum.photos/seed/moviebanner${i}/1280/720`,
  genres: [genres[i % 3], genres[(i + 1) % 3]],
  tags: i < 3 ? [tags[0], tags[1]] : [tags[1]],
  cast: ['Ator Principal', 'Atriz Principal', 'Coadjuvante Famoso'],
  director: 'Diretor Renomado',
  rating: '14',
  duration: 120 + i * 5,
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
}));

const mockSeries: Series[] = Array.from({ length: 8 }, (_, i) => ({
  id: `s${i + 1}`,
  type: 'series',
  title: `Série de Mistério ${i + 1}`,
  synopsis: `Um detetive brilhante resolve casos impossíveis na cidade de Neo-Veridia. A série ${i + 1} prende a atenção do início ao fim.`,
  year: 2024 - (i % 3),
  posterUrl: `https://picsum.photos/seed/series${i}/400/600`,
  bannerUrl: `https://picsum.photos/seed/seriesbanner${i}/1280/720`,
  genres: [genres[(i + 2) % 4], genres[(i + 3) % 4]],
  tags: i < 2 ? [tags[3], tags[2]] : [tags[2]],
  cast: ['Protagonista', 'Antagonista', 'Elenco de Suporte'],
  director: 'Criador da Série',
  rating: '16',
  seasons: [
    {
      id: `s${i + 1}s1`,
      seasonNumber: 1,
      episodes: Array.from({ length: 8 }, (_, j) => ({
        id: `s${i + 1}s1e${j + 1}`,
        title: `Episódio ${j + 1}: O Início`,
        synopsis: `O primeiro passo na jornada do mistério da temporada 1.`,
        thumbnailUrl: `https://picsum.photos/seed/s${i}s1e${j}/400/225`,
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        episodeNumber: j + 1,
      })),
    },
    {
      id: `s${i + 1}s2`,
      seasonNumber: 2,
      episodes: Array.from({ length: 8 }, (_, j) => ({
        id: `s${i + 1}s2e${j + 1}`,
        title: `Episódio ${j + 1}: A Reviravolta`,
        synopsis: `Um novo desafio surge na temporada 2.`,
        thumbnailUrl: `https://picsum.photos/seed/s${i}s2e${j}/400/225`,
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        episodeNumber: j + 1,
      })),
    },
  ],
}));

const allMedia = [...mockMovies, ...mockSeries];

const homeShelves: ContentShelf[] = [
    { id: 'shelf1', title: 'Novos Filmes Adicionados', items: mockMovies.slice(0, 8) },
    { id: 'shelf2', title: 'Séries em Alta', items: mockSeries.slice(0, 6) },
    { id: 'shelf3', title: 'Populares na Semana', items: [...mockMovies.slice(8, 12), ...mockSeries.slice(6, 8)].sort(() => 0.5 - Math.random()) },
    { id: 'shelf4', title: 'Ação e Aventura', items: allMedia.filter(m => m.genres.some(g => g.name === 'Ação')) },
];

export function useMockData() {
  const [media, setMedia] = useState<(Movie | Series)[]>(allMedia);
  const [shelves, setShelves] = useState<ContentShelf[]>(homeShelves);
  const [_genres, setGenres] = useState<Genre[]>(genres);
  const [_tags, setTags] = useState<Tag[]>(tags);

  const getMediaById = useCallback((type: 'movie' | 'series', id: string) => {
    return media.find(m => m.type === type && m.id === id);
  }, [media]);

  const getFeaturedItems = useCallback(() => {
      return [...mockMovies.slice(0,3), ...mockSeries.slice(0,2)].sort(() => 0.5 - Math.random());
  }, []);

  return {
    allMedia: media,
    getMediaById,
    homeShelves: shelves,
    getFeaturedItems,
    genres: _genres,
    tags: _tags,
  };
}
