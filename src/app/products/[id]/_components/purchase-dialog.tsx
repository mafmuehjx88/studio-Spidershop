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
import { Bookmark } from "lucide-react";
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
        status: "Completed",
        timestamp: new Date().toISOString(),
    };
    
    // Add order to history
    addDocumentNonBlocking(collection(firestore, `users/${user.uid}/orders`), orderData);

    // Deduct balance
    const userDocRef = doc(firestore, 'users', user.uid);
    const newBalance = userProfile.balance - price;
    updateDocumentNonBlocking(userDocRef, { balance: newBalance });

    // Send Telegram notification
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
        // We don't block the user if the notification fails, but we log it.
    }


    toast({
      title: "Purchase Successful",
      description: `${option.name} has been purchased.`,
    });

    onClose();
  };

  const isPurchaseDisabled = isMlbb 
    ? !gameId || !serverId || !isConfirmed 
    : !gameId || !isConfirmed;
  
  const balance = userProfile?.balance ?? 0;

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
