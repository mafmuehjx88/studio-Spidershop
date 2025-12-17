'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Copy, UploadCloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const paymentMethods = [
  {
    id: 'wavepay',
    name: 'Thant Sin Htay Naing',
    number: '09441571113',
    logoId: 'wave-pay',
  },
  {
    id: 'kbzpay',
    name: 'Thant Sin Htay Naing',
    number: '09441571113',
    logoId: 'kbz-pay',
  },
];

const notes = [
    {
        id: 'note1',
        title: 'သတိပေးချက်',
        content: 'Website မှာ ငွေသွင်းမဲ့ ငွေလွှဲပြေစာများကို ဘယ်သူ့ကိုမှ မပြပါနဲ့ ။ မသိနားမလည်တာရှိရင် ဖုန်းဆက်ပါ ( Telegram Account မှာလာမေးပါ )',
    },
    {
        id: 'note2',
        title: 'Note !!!',
        content: 'ငွေမလွှဲခင် ရေးထားတဲ့စာတွေ ဖတ်ပေးပါ',
    }
]

const PaymentCard = ({ method, onCopy }: { method: any; onCopy: (text: string) => void; }) => {
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

const NoteCard = ({ note, onCopy }: { note: any; onCopy: (text: string) => void; }) => {
  return (
    <Card className="bg-card border-red-500/50 border-2 overflow-hidden">
        <CardContent className="p-3 flex items-center gap-4">
             <div className="w-16 h-16 bg-card border-r border-border flex items-center justify-center">
                <p className="text-red-400 font-bold text-sm text-center">{note.title}</p>
            </div>
            <div className="flex-1">
                <p className="text-sm text-muted-foreground">{note.content}</p>
            </div>
             <Button variant="outline" size="sm" onClick={() => onCopy(note.content)} className="bg-gray-700 hover:bg-gray-600">
                <Copy className="h-4 w-4 mr-2" />
                Copy
            </Button>
        </CardContent>
    </Card>
  );
};


export default function TopUpPage() {
    const { toast } = useToast();

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: "The text has been copied to your clipboard.",
        });
    }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 bg-background text-foreground sparkle-bg">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="mb-6 flex justify-between items-center">
            <Button asChild variant="ghost" className="bg-gray-700/50 hover:bg-gray-600/50">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
             <Button variant="outline" className="bg-blue-600/80 hover:bg-blue-700/80 border-blue-400 text-white">
                မှတ်တမ်း
            </Button>
          </div>
          
          <div className="space-y-6">
              <h1 className="text-2xl font-bold text-primary text-center">ငွေဖြည့်မည်</h1>

              <div className='space-y-2'>
                <p className="text-muted-foreground">ငွေလွှဲအမျိုးအစားရွေးပါ</p>
                <div className='bg-card border border-border p-3 rounded-md flex justify-between items-center'>
                    <span>မြန်မာကျပ် 🇲🇲</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-5 w-5 text-muted-foreground"><path d="m6 9 6 6 6-6"></path></svg>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-primary">ငွေလွှဲနံပါတ်</h2>
                {paymentMethods.map(method => (
                    <PaymentCard key={method.id} method={method} onCopy={handleCopy} />
                ))}
                {notes.map(note => (
                    <NoteCard key={note.id} note={note} onCopy={handleCopy} />
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="font-semibold text-primary">Payment Screenshot ( ငွေလွှဲ Id ပါထည့်ပါ )</h3>
                <label htmlFor="screenshot" className="flex flex-col items-center justify-center w-full h-32 border-2 border-green-500 border-dashed rounded-lg cursor-pointer bg-green-500/10 hover:bg-green-500/20">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-2 text-green-400" />
                        <p className="mb-2 text-sm text-green-400">ငွေလွှဲပုံထည့်ရန်နှိပ်ပါ</p>
                    </div>
                    <input id="screenshot" type="file" className="hidden" />
                </label>
                <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold text-lg">
                    ဝယ်ယူမည်
                </Button>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}
