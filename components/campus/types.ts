export interface CampusImage {
  id: string;
  src: string;
  alt: string;
}

export interface CampusContent {
  title: string;
  buttonText: string;
  buttonHref: string;
  images: CampusImage[];
}
