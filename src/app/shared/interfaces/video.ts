import {Category} from './category';

export interface Video {
  id?: string;
  title: string;
  time: string;
  upload_date: string;
  nb_like: number;
  nb_dislike: number;
  author: string;
  description?: string;
  path: string;
  type: string;
  thumbnail_path: string;
  nb_view: number;
  url: string;
  categories: Category[];
}
