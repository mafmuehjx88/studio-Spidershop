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
    id: 'prod_1',
    name: 'Mobile Legends',
    description: 'Mobile Legends Bang Bang',
    price: '',
    image: findImage('mlbb-generic'),
  },
  {
    id: 'prod_2',
    name: 'PUBG Mobile',
    description: 'PUBG Mobile',
    price: '',
    image: findImage('pubg-mobile'),
  },
];
