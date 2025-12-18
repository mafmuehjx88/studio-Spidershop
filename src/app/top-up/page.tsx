'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PaymentCard } from './_components/payment-card';
import { NoteCard } from './_components/note-card';
import { useUserProfile } from '@/hooks/use-user-profile';
import { sendTelegramNotification } from '@/ai/flows/telegram-notifier-flow';
import { useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';


const paymentMethods = [
  {
    id: 'wavepay',
    name: 'Myo Win',
    number: '09678564784',
    logoId: 'wave-pay',
  },
  {
    id: 'kbzpay',
    name: 'Khin Than Nwe',
    number: '09256184317',
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


const TopUpPage = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { userProfile } = useUserProfile();
    const firestore = useFirestore();

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const fileSizeInMB = file.size / 1024 / 1024; // Convert bytes to MB

            if (fileSizeInMB > 1) {
                toast({
                    title: "Upload မအောင်မြင်ပါ",
                    description: "1MB ကျော်တဲ့အပုံဆိုရင် အပုံထည့်မရပါ screen shot အပုံပဲရပါတယ်",
                    variant: "destructive",
                });
                // Reset the input and preview
                event.target.value = "";
                setSelectedFile(null);
                setImagePreview(null);
                return;
            }
            
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async () => {
        if (!selectedFile) {
            toast({
                title: "Error",
                description: "Please upload a screenshot.",
                variant: "destructive",
            });
            return;
        }

        if (!userProfile) {
             toast({
                title: "Error",
                description: "You must be logged in to submit a top-up request.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = async () => {
                const base64Image = reader.result as string;
                
                await sendTelegramNotification({
                    username: userProfile.username,
                    receiptDataUri: base64Image,
                });
                
                // Create notification in Firestore
                const notificationData = {
                  userId: userProfile.id,
                  message: 'ငွေဖြည့်သွင်းအော်ဒါတင်ခြင်း အောင်မြင်ပါတယ် ။ ငွေဖြည့်သွင်းခြင်းလုပ်ငန်းစဥ်ကို မနက် 9နာရီမှ ည 10နာရီအတွင်း ငွေဖြည့်သွင်းပါက 3Mins မှ 15Mins အတွင်းသင့်အကောင့်ထဲရောက်လာမှာဖြစ်ပါတယ်ဗျ..',
                  timestamp: new Date().toISOString(),
                  isRead: false,
                };
                addDocumentNonBlocking(collection(firestore, `users/${userProfile.id}/notifications`), notificationData);


                router.push('/');
                
                setTimeout(() => {
                    toast({
                        title: (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-400" />
                              <span>အောင်မြင်ပါသည်</span>
                            </div>
                        ),
                        description: "စတင် လုပ်ဆောင်နေပါသည်",
                        variant: "success",
                        duration: 3000,
                    });
                }, 100);
            };

            reader.onerror = (error) => {
                console.error("Error reading file:", error);
                toast({
                    title: "File Read Error",
                    description: "Could not process the uploaded file.",
                    variant: "destructive",
                });
                setIsSubmitting(false);
            };
        } catch (error) {
            console.error("Error sending notification:", error);
            toast({
                title: "Submission Failed",
                description: "There was an error submitting your request. Please try again.",
                variant: "destructive",
            });
            setIsSubmitting(false);
        }
    }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 bg-background text-foreground pb-20">
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
                <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold text-lg" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'ဝယ်ယူမည်'}
                </Button>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TopUpPage;
