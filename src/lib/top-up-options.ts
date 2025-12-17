import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type TopUpOption = {
  id: string;
  name: string;
  price: string;
  image: ImagePlaceholder;
  badgeText?: string;
  badgeIcon?: string;
  promoTag?: string;
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

export const topUpOptions: Record<string, TopUpOption[]> = {
  'prod_2': [ // Corresponds to PUBG Mobile
    {
      id: 'uc_1',
      name: '60UC',
      price: '3850',
      image: findImage('pubg-uc-1'),
      promoTag: 'မစောင့်ရပါ',
    },
    {
      id: 'uc_2',
      name: '325UC',
      price: '19300',
      image: findImage('pubg-uc-2'),
      promoTag: 'မစောင့်ရပါ',
    },
    {
      id: 'uc_3',
      name: '660UC',
      price: '38600',
      image: findImage('pubg-uc-3'),
      promoTag: 'မစောင့်ရပါ',
    },
    {
      id: 'uc_4',
      name: '1800UC',
      price: '93000',
      image: findImage('pubg-uc-4'),
      promoTag: 'မစောင့်ရပါ',
    },
    {
      id: 'uc_5',
      name: '3850UC',
      price: '184000',
      image: findImage('pubg-uc-5'),
      promoTag: 'မစောင့်ရပါ',
    },
     {
      id: 'uc_6',
      name: '8100UC',
      price: '366000',
      image: findImage('pubg-uc-6'),
      promoTag: 'မစောင့်ရပါ',
    },
  ],
  // Add other products' top-up options here
};
