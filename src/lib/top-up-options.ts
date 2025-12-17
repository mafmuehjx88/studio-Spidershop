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
  
};
