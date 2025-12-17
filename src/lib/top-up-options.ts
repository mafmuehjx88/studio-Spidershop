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
      name: 'First Purchase Pack',
      price: '3900',
      image: findImage('pubg-uc-1'),
      badgeText: '1',
      badgeIcon: 'https://picsum.photos/seed/gift-icon/16/16',
      promoTag: 'မစောင့်ရပါ',
    },
    {
      id: 'uc_2',
      name: 'Materials Pack',
      price: '11700',
      image: findImage('pubg-uc-2'),
      badgeText: '1',
      badgeIcon: 'https://picsum.photos/seed/gift-icon/16/16',
      promoTag: 'မစောင့်ရပါ',
    },
    {
      id: 'uc_3',
      name: 'Mythic Emblem Pack',
      price: '19400',
      image: findImage('pubg-uc-3'),
      badgeText: '1',
      badgeIcon: 'https://picsum.photos/seed/gift-icon/16/16',
      promoTag: 'မစောင့်ရပါ',
    },
    {
      id: 'uc_4',
      name: 'Weekly Deal Pack',
      price: '4000',
      image: findImage('pubg-uc-4'),
      badgeText: '1',
      badgeIcon: 'https://picsum.photos/seed/gift-icon/16/16',
      promoTag: 'မစောင့်ရပါ',
    },
    {
      id: 'uc_5',
      name: 'Weekly Deal Pack2',
      price: '11900',
      image: findImage('pubg-uc-5'),
      badgeText: '1',
      badgeIcon: 'https://picsum.photos/seed/gift-icon/16/16',
      promoTag: 'မစောင့်ရပါ',
    },
     {
      id: 'uc_6',
      name: 'Weekly Mythic Pack',
      price: '14600',
      image: findImage('pubg-uc-6'),
      badgeText: '2',
      badgeIcon: 'https://picsum.photos/seed/gift-icon/16/16',
      promoTag: 'မစောင့်ရပါ',
    },
    {
      id: 'uc_7',
      name: 'Prime (1 Month)',
      price: '3900',
      image: findImage('pubg-uc-7'),
      badgeText: '1',
      badgeIcon: 'https://picsum.photos/seed/gift-icon/16/16',
      promoTag: 'မစောင့်ရပါ',
    },
    {
      id: 'uc_8',
      name: 'Prime (3 Month)',
      price: '11500',
      image: findImage('pubg-uc-8'),
      badgeText: '2',
      badgeIcon: 'https://picsum.photos/seed/gift-icon/16/16',
      promoTag: 'မစောင့်ရပါ',
    },
    {
      id: 'uc_9',
      name: 'Prime (6 Month)',
      price: '23000',
      image: findImage('pubg-uc-9'),
      badgeText: '3',
      badgeIcon: 'https://picsum.photos/seed/gift-icon/16/16',
      promoTag: 'မစောင့်ရပါ',
    },
  ],
  // Add other products' top-up options here
};
