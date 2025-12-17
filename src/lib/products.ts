import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: ImagePlaceholder;
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
    name: '500 Diamonds',
    description: 'A starter pack of 500 shimmering diamonds.',
    price: '$4.99',
    image: findImage('diamond-pack-1'),
  },
  {
    id: 'prod_2',
    name: '1200 Diamonds',
    description: 'A valuable bundle of 1200 diamonds for the dedicated player.',
    price: '$9.99',
    image: findImage('diamond-pack-2'),
  },
  {
    id: 'prod_3',
    name: '3850 UC',
    description: 'Get 3850 Unknown Cash to spend in-game.',
    price: '$49.99',
    image: findImage('uc-pack-1'),
  },
  {
    id: 'prod_4',
    name: '8100 UC',
    description: 'The ultimate 8100 UC pack for the ultimate gamer.',
    price: '$99.99',
    image: findImage('uc-pack-2'),
  },
];
