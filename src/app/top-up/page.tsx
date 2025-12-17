'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Copy, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PaymentCard } from './_components/payment-card';
import { NoteCard } from './_components/note-card';

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


export default function TopUpPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = () => {
        if (!selectedFile) {
            toast({
                title: "Error",
                description: "Please upload a screenshot.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>အောင်မြင်ပါသည်</span>
                </div>
            ),
            description: "Your top-up request has been submitted.",
            variant: "success",
            duration: 3000,
        });
        
        // Reset state after a short delay and redirect
        setTimeout(() => {
            setSelectedFile(null);
            setImagePreview(null);
            router.push('/');
        }, 3000);
    }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 bg-background text-foreground sparkle-bg">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="mb-6">
            <Button asChild variant="ghost" className="bg-gray-700/50 hover:bg-gray-600/50">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
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
                <label htmlFor="screenshot" className="flex flex-col items-center justify-center w-full h-48 border-2 border-green-500 border-dashed rounded-lg cursor-pointer bg-green-500/10 hover:bg-green-500/20 relative overflow-hidden">
                    {imagePreview ? (
                        <Image src={imagePreview} alt="Screenshot preview" layout="fill" objectFit="cover" />
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-2 text-green-400" />
                            <p className="mb-2 text-sm text-green-400">ငွေလွှဲပုံထည့်ရန်နှိပ်ပါ</p>
                        </div>
                    )}
                    <input id="screenshot" type="file" className="hidden" onChange={handleFileChange} accept="image/*"/>
                </label>
                <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold text-lg" onClick={handleSubmit}>
                    ဝယ်ယူမည်
                </Button>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}
