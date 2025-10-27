export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  slug: string;
  readingTime?: string;
}

export interface Post extends PostMetadata {
  content: string;
}
