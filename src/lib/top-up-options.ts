import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type TopUpOption = {
  id: string;
  name: string;
  price: string;
  image: ImagePlaceholder;
  quantity?: number;
  inStockTag?: string;
  promoTag?: string;
  discountTag?: string;
  rechargeTag?: string;
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
          inStockTag: 'မစောင့်ရပါ',
        },
        {
          id: 'twilight-pass',
          name: 'Twilight Pass',
          price: '33500ks',
          image: findImage('mlbb-twilight-pass'),
          inStockTag: 'မစောင့်ရပါ',
        },
      ],
    },
    {
      id: '2x-diamonds',
      title: '2x Diamonds',
      gridCols: 'grid-cols-4',
      options: [
        {
          id: '2x-50',
          name: '50 (2x50)',
          price: '3,350 Ks',
          image: findImage('mlbb-diamonds'),
          inStockTag: 'မစောင့်ရပါ',
        },
        {
          id: '2x-150',
          name: '150 (2x150)',
          price: '9,200 Ks',
          image: findImage('mlbb-diamonds'),
          inStockTag: 'မစောင့်ရပါ',
        },
        {
          id: '2x-250',
          name: '250 (2x250)',
          price: '15,500 Ks',
          image: findImage('mlbb-diamonds'),
          inStockTag: 'မစောင့်ရပါ',
        },
        {
            id: '2x-500',
            name: '500 (2x500)',
            price: '29,700 Ks',
            image: findImage('mlbb-diamonds-large'),
            inStockTag: 'မစောင့်ရပါ',
        }
      ],
    },
    {
        id: 'other-diamonds',
        title: 'Other Diamonds',
        gridCols: 'grid-cols-3 md:grid-cols-4',
        options: [
            { id: 'd-11', name: '11 Diamond', price: '850 Ks', image: findImage('mlbb-diamond-small'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-22', name: '22 Diamond', price: '1800 Ks', image: findImage('mlbb-diamond-small'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-56', name: '56 Diamond', price: '4250 Ks', image: findImage('mlbb-diamond-small'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-86', name: '86 Diamond', price: '4800 Ks', image: findImage('mlbb-diamond-small'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-172', name: '172 Diamond', price: '9600 Ks', image: findImage('mlbb-diamonds'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-257', name: '257 Diamond', price: '14800 Ks', image: findImage('mlbb-diamonds'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-343', name: '343 Diamond', price: '19700 Ks', image: findImage('mlbb-diamonds'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-429', name: '429 Diamond', price: '24800 Ks', image: findImage('mlbb-diamonds-large'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-514', name: '514 Diamond', price: '30000 Ks', image: findImage('mlbb-diamonds-large'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-600', name: '600 Diamond', price: '34500 Ks', image: findImage('mlbb-diamonds-large'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-706', name: '706 Diamond', price: '39600 Ks', image: findImage('mlbb-diamonds-large'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-963', name: '963 Diamond', price: '54200 Ks', image: findImage('mlbb-diamonds-large'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-1049', name: '1049 Diamond', price: '59300 Ks', image: findImage('mlbb-diamonds-large'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-1135', name: '1135 Diamond', price: '64200 Ks', image: findImage('mlbb-diamonds-large'), inStockTag: 'မစောင့်ရပါ' },
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
          inStockTag: 'မစောင့်ရပါ',
        },
        {
          id: 'uc-325',
          name: '325UC',
          price: '19300Ks',
          image: findImage('pubg-uc-2'),
          inStockTag: 'မစောင့်ရပါ',
        },
        {
          id: 'uc-660',
          name: '660UC',
          price: '38600Ks',
          image: findImage('pubg-uc-3'),
          inStockTag: 'မစောင့်ရပါ',
        },
        {
          id: 'uc-1800',
          name: '1800UC',
          price: '93000Ks',
          image: findImage('pubg-uc-4'),
          inStockTag: 'မစောင့်ရပါ',
        },
        {
          id: 'uc-3850',
          name: '3850UC',
          price: '184000Ks',
          image: findImage('pubg-uc-5'),
          inStockTag: 'မစောင့်ရပါ',
        },
        {
          id: 'uc-8100',
          name: '8100UC',
          price: '366000Ks',
          image: findImage('pubg-uc-6'),
          inStockTag: 'မစောင့်ရပါ',
        },
      ],
    },
  ]
};
