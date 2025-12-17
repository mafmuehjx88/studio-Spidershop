'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Copy } from 'lucide-react';

type PaymentMethod = {
    id: string;
    name: string;
    number: string;
    logoId: string;
}

export const PaymentCard = ({ method, onCopy }: { method: PaymentMethod; onCopy: (text: string) => void; }) => {
    const logo = PlaceHolderImages.find(p => p.id === method.logoId);
    
    return (
        <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-3 flex items-center gap-4">
                {logo && (
                    <div className="relative w-16 h-16 bg-white rounded-lg flex items-center justify-center p-1">
                        <Image
                            src={logo.imageUrl}
                            alt={`${method.id} logo`}
                            width={60}
                            height={60}
                            className="object-contain"
                            data-ai-hint={logo.imageHint}
                        />
                    </div>
                )}
                <div className="flex-1">
                    <p className="font-semibold text-lg text-primary">{method.number}</p>
                    <p className="text-muted-foreground">{method.name}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => onCopy(method.number)} className="bg-gray-700 hover:bg-gray-600">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                </Button>
            </CardContent>
        </Card>
    );
}
