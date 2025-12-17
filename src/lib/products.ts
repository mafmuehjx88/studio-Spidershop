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
    name: 'MLBB',
    description: 'Mobile Legends Bang Bang',
    price: '',
    image: findImage('mlbb-generic'),
  },
  {
    id: 'prod_2',
    name: 'PUBG',
    description: 'PUBG Mobile',
    price: '',
    image: findImage('pubg-mobile'),
  },
  {
    id: 'prod_3',
    name: 'MLBB Singapore',
    description: 'Mobile Legends Singapore Server',
    price: '',
    image: findImage('mlbb-singapore'),
    tag: 'Singapore',
    tagColor: 'bg-red-600'
  },
  {
    id: 'prod_4',
    name: 'MLBB Philippines',
    description: 'Mobile Legends Philippines Server',
    price: '',
    image: findImage('mlbb-philippines'),
    tag: 'Philipine',
    tagColor: 'bg-blue-800'
  },
  {
    id: 'prod_5',
    name: 'MLBB Indonesia',
    description: 'Mobile Legends Indonesia Server',
    price: '',
    image: findImage('mlbb-indonesia'),
    tag: 'Indonesia',
    tagColor: 'bg-red-700'
  },
  {
    id: 'prod_6',
    name: 'MLBB Malaysia',
    description: 'Mobile Legends Malaysia Server',
    price: '',
    image: findImage('mlbb-malaysia'),
    tag: 'Malaysia',
    tagColor: 'bg-yellow-500'
  },
];
