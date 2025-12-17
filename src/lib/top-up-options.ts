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
          id: 'twilight-pass',
          name: 'Twilight Pass',
          price: '30020 ကျပ်',
          image: findImage('mlbb-twilight-pass'),
          inStockTag: 'မစောင့်ရပါ',
        },
        {
          id: 'weekly-pass',
          name: 'Weekly Pass',
          price: '5680 ကျပ်',
          image: findImage('mlbb-weekly-pass'),
          inStockTag: 'မစောင့်ရပါ',
          discountTag: '445%',
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
          name: '50+50 အပိုရ',
          price: '3012 ကျပ်',
          image: findImage('mlbb-diamonds'),
          inStockTag: 'မစောင့်ရပါ',
          rechargeTag: 'First Recharge'
        },
        {
          id: '2x-150',
          name: '150+150 အပိုရ',
          price: '8928 ကျပ်',
          image: findImage('mlbb-diamonds'),
          inStockTag: 'မစောင့်ရပါ',
          rechargeTag: 'First Recharge'
        },
        {
          id: '2x-250',
          name: '250+250 အပိုရ',
          price: '14519 ကျပ်',
          image: findImage('mlbb-diamonds'),
          inStockTag: 'မစောင့်ရပါ',
          rechargeTag: 'First Recharge'
        },
        {
            id: '2x-500',
            name: '500+500 အပိုရ',
            price: '29759 ကျပ်',
            image: findImage('mlbb-diamonds-large'),
            inStockTag: 'မစောင့်ရပါ',
            rechargeTag: 'First Recharge'
        }
      ],
    },
    {
        id: 'other-diamonds',
        title: 'Other Diamonds',
        gridCols: 'grid-cols-3',
        options: [
            { id: 'd-11', name: '11 Diamond', price: '825 ကျပ်', image: findImage('mlbb-diamond-small'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-22', name: '22 Diamond', price: '1549 ကျပ်', image: findImage('mlbb-diamond-small'), inStockTag: 'မစောင့်ရပါ' },
            { id: 'd-33', name: '33 Diamond', price: '2309 ကျပ်', image: findImage('mlbb-diamond-small'), inStockTag: 'မစောင့်ရပါ' },
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
