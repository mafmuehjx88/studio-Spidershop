
import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type TopUpOption = {
  id: string;
  name: string;
  price: string;
  image: ImagePlaceholder;
  quantity?: number;
  promoTag?: string;
  discountTag?: string;
};

export type TopUpCategory = {
  id: string;
  title: string;
  gridCols?: string;
  options: TopUpOption[];
};

const findImage = (id: string): ImagePlaceholder => {
    const image = PlaceHolderImages.find(p => p.id === id);
    if (!image) {
        // Fallback in case image is not found.
        return {
            id: 'fallback',
            description: 'Placeholder image',
            imageUrl: 'https://picsum.photos/seed/fallback-item/100/100',
            imageHint: 'placeholder'
        };
    }
    return image;
}

export const topUpOptions: Record<string, TopUpCategory[]> = {
  'prod_1': [
    {
      id: 'weekly-twilight',
      title: 'Weekly Pass & Twilight Pass',
      gridCols: 'grid-cols-2',
      options: [
        {
          id: 'weekly-pass',
          name: 'Weekly Pass',
          price: '5850ks',
          image: findImage('mlbb-weekly-pass'),
        },
        {
          id: 'twilight-pass',
          name: 'Twilight Pass',
          price: '33500ks',
          image: findImage('mlbb-twilight-pass'),
        },
      ],
    },
    {
      id: '2x-diamonds',
      title: '2x Diamonds',
      gridCols: 'grid-cols-3',
      options: [
        {
          id: '2x-50',
          name: '50 (2x50)',
          price: '3,350 Ks',
          image: findImage('mlbb-2x-50'),
        },
        {
          id: '2x-150',
          name: '150 (2x150)',
          price: '9,200 Ks',
          image: findImage('mlbb-2x-150'),
        },
        {
          id: '2x-250',
          name: '250 (2x250)',
          price: '15,500 Ks',
          image: findImage('mlbb-2x-500'),
        },
        {
            id: '2x-500',
            name: '500 (2x500)',
            price: '29,700 Ks',
            image: findImage('mlbb-2x-500'),
        }
      ],
    },
    {
        id: 'other-diamonds',
        title: 'Other Diamonds',
        gridCols: 'grid-cols-3',
        options: [
            { id: 'd-11', name: '11 Diamond', price: '850ks', image: findImage('mlbb-diamond-small') },
            { id: 'd-22', name: '22 Diamond', price: '1800ks', image: findImage('mlbb-diamond-small') },
            { id: 'd-56', name: '56 Diamond', price: '4250ks', image: findImage('mlbb-diamond-small') },
            { id: 'd-86', name: '86 Diamond', price: '4800ks', image: findImage('mlbb-diamonds-medium') },
            { id: 'd-172', name: '172 Diamond', price: '9600ks', image: findImage('mlbb-diamonds-medium') },
            { id: 'd-257', name: '257 Diamond', price: '14800ks', image: findImage('mlbb-diamonds-medium') },
            { id: 'd-343', name: '343 Diamond', price: '19700ks', image: findImage('mlbb-diamonds-343') },
            { id: 'd-429', name: '429 Diamond', price: '24800ks', image: findImage('mlbb-diamonds-343') },
            { id: 'd-514', name: '514 Diamond', price: '30000ks', image: findImage('mlbb-diamonds-514') },
            { id: 'd-600', name: '600 Diamond', price: '34500ks', image: findImage('mlbb-diamonds-514') },
            { id: 'd-706', name: '706 Diamond', price: '39600ks', image: findImage('mlbb-diamonds-706') },
            { id: 'd-963', name: '963 Diamond', price: '54200ks', image: findImage('mlbb-diamonds-706') },
            { id: 'd-1049', name: '1049 Diamond', price: '59300ks', image: findImage('mlbb-diamonds-1049') },
            { id: 'd-1135', name: '1135 Diamond', price: '64200ks', image: findImage('mlbb-diamonds-1049') },
        ]
    }
  ],
  'prod_2': [
    {
      id: 'pubg-uc',
      title: 'Pubg Global Price',
      gridCols: 'grid-cols-3',
      options: [
        {
          id: 'uc-60',
          name: '60UC',
          price: '3850Ks',
          image: findImage('pubg-uc-1'),
        },
        {
          id: 'uc-325',
          name: '325UC',
          price: '19300Ks',
          image: findImage('pubg-uc-2'),
        },
        {
          id: 'uc-660',
          name: '660UC',
          price: '38600Ks',
          image: findImage('pubg-uc-2'),
        },
        {
          id: 'uc-1800',
          name: '1800UC',
          price: '93000Ks',
          image: findImage('pubg-uc-4'),
        },
        {
          id: 'uc-3850',
          name: '3850UC',
          price: '184000Ks',
          image: findImage('pubg-uc-5'),
        },
        {
          id: 'uc-8100',
          name: '8100UC',
          price: '366000Ks',
          image: findImage('pubg-uc-6'),
        },
      ],
    },
  ]
};

    
