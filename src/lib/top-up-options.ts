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
  'prod_1': [ // Corresponds to MLBB
    {
      id: 'weekly-twilight',
      title: 'Weekly Pass & Twilight Pass',
      options: [
        {
          id: 'ml_weekly',
          name: 'Weekly Pass',
          price: '5680',
          image: findImage('mlbb-weekly-pass'),
          quantity: 1,
          inStockTag: 'မစောင့်ရပါ',
          discountTag: '445%',
        },
        {
          id: 'ml_twilight',
          name: 'Twilight Pass',
          price: '31900',
          image: findImage('mlbb-twilight-pass'),
          quantity: 3,
          inStockTag: 'မစောင့်ရပါ',
        },
      ],
    },
    {
      id: '2x-diamonds',
      title: '2x Diamonds',
      options: [
        {
          id: 'ml_2x_1',
          name: '50+50 အပိုရ',
          price: '3100',
          image: findImage('mlbb-diamonds'),
          quantity: 1,
          inStockTag: 'မစောင့်ရပါ',
          rechargeTag: 'First Recharge',
        },
        {
          id: 'ml_2x_2',
          name: '150+150 အပိုရ',
          price: '9300',
          image: findImage('mlbb-diamonds'),
          quantity: 1,
          inStockTag: 'မစောင့်ရပါ',
          rechargeTag: 'First Recharge',
        },
        {
          id: 'ml_2x_3',
          name: '250+250 အပိုရ',
          price: '14800',
          image: findImage('mlbb-diamonds'),
          quantity: 1,
          inStockTag: 'မစောင့်ရပါ',
          rechargeTag: 'First Recharge',
        },
         {
          id: 'ml_2x_4',
          name: '500+500 အပိုရ',
          price: '29600',
          image: findImage('mlbb-diamonds'),
          quantity: 1,
          inStockTag: 'မစောင့်ရပါ',
          rechargeTag: 'First Recharge',
        },
      ]
    }
  ],
  'prod_2': [ // Corresponds to PUBG Mobile
    {
      id: 'pubg-global',
      title: 'Pubg Global Price',
      options: [
        {
          id: 'uc_1',
          name: '60UC',
          price: '3850',
          image: findImage('pubg-uc-1'),
        },
        {
          id: 'uc_2',
          name: '325UC',
          price: '19300',
          image: findImage('pubg-uc-2'),
        },
        {
          id: 'uc_3',
          name: '660UC',
          price: '38600',
          image: findImage('pubg-uc-3'),
        },
        {
          id: 'uc_4',
          name: '1800UC',
          price: '93000',
          image: findImage('pubg-uc-4'),
        },
        {
          id: 'uc_5',
          name: '3850UC',
          price: '184000',
          image: findImage('pubg-uc-5'),
        },
         {
          id: 'uc_6',
          name: '8100UC',
          price: '366000',
          image: findImage('pubg-uc-6'),
        },
      ]
    }
  ],
  // Add other products' top-up options here
};
