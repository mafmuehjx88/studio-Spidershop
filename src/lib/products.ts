import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: ImagePlaceholder;
  tag?: string;
  tagColor?: string;
};

const findImage = (id: string): ImagePlaceholder => {
    const image = PlaceHolderImages.find(p => p.id === id);
    if (!image) {
        // Fallback in case image is not found.
        return {
            id: 'fallback',
            description: 'Placeholder image',
            imageUrl: 'https://picsum.photos/seed/fallback/400/300',
            imageHint: 'placeholder'
        };
    }
    return image;
}

export const products: Product[] = [
  {
    id: 'prod_news',
    name: 'Game News',
    description: 'Latest news in gaming',
    price: '',
    image: findImage('game-news'),
  },
  {
    id: 'prod_1',
    name: 'Mobile Legends',
    description: 'Mobile Legends Bang Bang',
    price: '',
    image: findImage('mlbb-generic'),
  },
  {
    id: 'prod_freefire',
    name: 'Freefire',
    description: 'Garena Free Fire',
    price: '',
    image: findImage('freefire'),
  },
  {
    id: 'prod_2',
    name: 'PUBG Mobile',
    description: 'PUBG Mobile',
    price: '',
    image: findImage('pubg-mobile'),
  },
  {
    id: 'prod_magic_chess',
    name: 'Magic Chess Go',
    description: 'Magic Chess Go',
    price: '',
    image: findImage('magic-chess'),
  },
  {
    id: 'prod_honor_of_kings',
    name: 'Honor Of Kings',
    description: 'Honor of Kings',
    price: '',
    image: findImage('honor-of-kings'),
  },
];
