export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  slug: string;
}

export interface BlogContent {
  title: string;
  subtitle: string;
  posts: BlogPost[];
}
