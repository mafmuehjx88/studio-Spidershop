"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { TopUpOption } from "@/lib/top-up-options";
import { Bookmark, CheckCircle2, AlertCircle } from "lucide-react";
import { useUser } from "@/firebase";
import { useFirestore } from "@/firebase/provider";
import { addDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { collection, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/lib/products";
import { useUserProfile } from "@/hooks/use-user-profile";
import { sendTelegramNotification } from "@/ai/flows/telegram-notifier-flow";

interface PurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  option: TopUpOption;
  productId: string;
}

export function PurchaseDialog({
  isOpen,
  onClose,
  option,
  productId,
}: PurchaseDialogProps) {
  const { user } = useUser();
  const { userProfile } = useUserProfile();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [gameId, setGameId] = useState("");
  const [serverId, setServerId] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const isMlbb = productId === 'prod_1';
  const isTelegram = productId === 'prod_4';

  const parsePrice = (priceString: string) => {
    return parseInt(priceString.replace(/ks|,/gi, ''));
  };

  const handlePurchase = async () => {
    if (!user || !userProfile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to make a purchase.",
      });
      return;
    }
    
    const price = parsePrice(option.price);
    if (userProfile.balance < price) {
        toast({
            variant: "destructive",
            title: "Purchase Failed",
            description: "Your balance is not enough.",
        });
        return;
    }

    const product = products.find(p => p.id === productId);
    const productName = product?.name || 'Unknown Product';

    const orderData = {
        userId: user.uid,
        productId: productId,
        productName: productName,
        optionName: option.name,
        price: option.price,
        gameId: gameId,
        ...(isMlbb && { serverId: serverId }),
        status: "Pending",
        timestamp: new Date().toISOString(),
    };
    
    const newOrderRef = await addDocumentNonBlocking(collection(firestore, `users/${user.uid}/orders`), orderData);

    if (newOrderRef) {
        const orderId = newOrderRef.id;
        const notificationMessage = `Order ${orderId.slice(0, 6)} အားစတင်လုပ်ဆောင်နေပါပြီ`;
        const notificationData = {
          userId: user.uid,
          message: notificationMessage,
          timestamp: new Date().toISOString(),
          isRead: false,
        };
        addDocumentNonBlocking(collection(firestore, `users/${user.uid}/notifications`), notificationData);
    }

    const userDocRef = doc(firestore, 'users', user.uid);
    const newBalance = userProfile.balance - price;
    updateDocumentNonBlocking(userDocRef, { balance: newBalance });

    try {
        await sendTelegramNotification({
            username: userProfile.username,
            productName: productName,
            optionName: option.name,
            price: option.price,
            gameId: gameId,
            ...(isMlbb && { serverId: serverId }),
        });
    } catch (error) {
        console.error("Failed to send Telegram notification on purchase:", error);
    }


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

    onClose();
  };

  const isPurchaseDisabled = isMlbb 
    ? !gameId || !serverId || !isConfirmed 
    : !gameId || !isConfirmed;
  
  const balance = userProfile?.balance ?? 0;
  
  if (isTelegram) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-black text-white border-gray-700 max-w-sm">
            <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
                အချက်အလက်များဖြည့်သွင်းပါ
            </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="bg-red-900/50 border border-red-500/80 text-red-300 p-3 rounded-md text-sm space-y-1">
                    <p className="font-semibold">ဝယ်မဲ့သူရဲ့ Username ပေးဖို့ပဲလိုပါတယ်ဗျ။</p>
                    <p>ကြာချိန် - Fast</p>
                </div>
                <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.226.63.428.998.63.21.115.42.229.638.346.218.119.495.213.78.216.292.003.559-.07.794-.218.272-.165.478-.36.612-.599.133-.23.166-.46.166-.634.003-.245-.02-.487-.062-.727-.052-.319-.22-.753-.41-1.246l-.208-.516a1.626 1.626 0 0 0-.44-1.043C11.65.65 11.278.333 10.8.16c-.478-.17-.926-.182-1.287-.145-.363.037-.6.18-.78.33l-.01.01z"/>
                        </svg>
                        Telegram Link
                    </Label>
                    <Input
                        id="gameId"
                        value={gameId}
                        onChange={(e) => setGameId(e.target.value)}
                        className="bg-[#2d2d2d] border-gray-600 text-white"
                        placeholder="Telegram link or username"
                    />
                </div>
            
                <div className="space-y-2">
                    <Label className="text-muted-foreground">ပမာဏ</Label>
                    <div className="flex justify-between items-center bg-[#2d2d2d] p-3 rounded-md">
                        <span>{option.name}</span>
                        <span>{option.price}</span>
                    </div>
                </div>

                <div className="bg-blue-900/50 text-blue-300 p-3 rounded-md text-center text-sm font-semibold">
                    လက်ကျန်ငွေ = {balance.toLocaleString()} ကျပ်
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                    id="confirm-details-telegram"
                    checked={isConfirmed}
                    onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
                    className="border-red-400 data-[state=checked]:bg-red-500"
                    />
                    <label
                    htmlFor="confirm-details-telegram"
                    className="text-sm font-medium leading-none text-red-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    အချက်အလက်များမှန်ကန်ပါတယ်
                    </label>
                </div>
            </div>
            <DialogFooter className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={onClose} className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white">
                မဝယ်သေးပါ
            </Button>
            <Button
                onClick={handlePurchase}
                disabled={isPurchaseDisabled}
                className="bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-600 disabled:opacity-50"
            >
                ဝယ်မည်
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] text-white border-none max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">
            အချက်အလက်များဖြည့်သွင်းပါ
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
               <svg
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M128,24a104,104,0,1,0,104,104A104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm68-88a68,68,0,0,1-68,68,52,52,0,0,1-52-52,60,60,0,0,1,60-60,68,68,0,0,1,68,68Zm-60-32a28,28,0,1,0-28,28,28,28,0,0,0,28-28Z"></path>
              </svg>
              Account Info
               <Button size="icon" variant="ghost" className="ml-auto save-button h-7 w-7">
                <Bookmark className="h-4 w-4" />
              </Button>
            </Label>
            
            {isMlbb ? (
              <div className="flex items-center gap-1 bg-[#2d2d2d] p-1 rounded-md">
                <Input
                  id="gameId"
                  placeholder="Game Id"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  className="bg-transparent border-0 text-center"
                />
                <span className="text-gray-400">(</span>
                <Input
                  id="serverId"
                  placeholder="Server Id"
                  value={serverId}
                  onChange={(e) => setServerId(e.target.value)}
                  className="bg-transparent border-0 text-center"
                />
                 <span className="text-gray-400">)</span>
              </div>
            ) : (
               <div className="flex items-center gap-2">
                <Input
                  id="gameId"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  className="bg-[#2d2d2d] border-none"
                  placeholder="Game Id"
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>ပမာဏ</Label>
            <div className="flex justify-between items-center bg-[#2d2d2d] p-3 rounded-md">
              <span>{option.name}</span>
              <span>{option.price}</span>
            </div>
          </div>
          <div className="bg-blue-500/20 text-blue-300 p-3 rounded-md text-center">
            လက်ကျန်ငွေ = {balance} ကျပ်
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirm-details"
              checked={isConfirmed}
              onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
              className="border-white data-[state=checked]:bg-green-500"
            />
            <label
              htmlFor="confirm-details"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              အချက်အလက်များမှန်ကန်ပါတယ်
            </label>
          </div>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={onClose} className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white">
            မဝယ်သေးပါ
          </Button>
          <Button
            onClick={handlePurchase}
            disabled={isPurchaseDisabled}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            ဝယ်မည်
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
