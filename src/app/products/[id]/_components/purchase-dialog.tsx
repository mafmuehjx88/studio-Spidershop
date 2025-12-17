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
  const [gameId, setGameId] = useState("");
  const [serverId, setServerId] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const isMlbb = productId === 'prod_1';

  const handlePurchase = () => {
    // Handle purchase logic here
    console.log("Purchasing:", {
      option: option.name,
      price: option.price,
      gameId,
      ...(isMlbb && { serverId }),
    });
    onClose();
  };

  const isPurchaseDisabled = isMlbb 
    ? !gameId || !serverId || !isConfirmed 
    : !gameId || !isConfirmed;

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
            <Label htmlFor="gameId" className="flex items-center gap-2">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M128,24a104,104,0,1,0,104,104A104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm68-88a68,68,0,0,1-68,68,52,52,0,0,1-52-52,60,60,0,0,1,60-60,68,68,0,0,1,68,68Zm-60-32a28,28,0,1,0-28,28,28,28,0,0,0,28-28Z"></path>
              </svg>
              Game Id
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="gameId"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="bg-[#2d2d2d] border-none"
              />
              <Button size="icon" className="save-button">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {isMlbb && (
            <div className="space-y-2">
               <Label htmlFor="serverId" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Server Id
              </Label>
              <Input
                id="serverId"
                value={serverId}
                onChange={(e) => setServerId(e.target.value)}
                className="bg-[#2d2d2d] border-none"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label>ပမာဏ</Label>
            <div className="flex justify-between items-center bg-[#2d2d2d] p-3 rounded-md">
              <span>{option.name}</span>
              <span>{option.price}</span>
            </div>
          </div>
          <div className="bg-blue-500/20 text-blue-300 p-3 rounded-md text-center">
            လက်ကျန်ငွေ = 0 ကျပ်
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
