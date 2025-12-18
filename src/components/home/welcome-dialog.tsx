"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenDialog = sessionStorage.getItem("hasSeenWelcomeDialog");
    if (!hasSeenDialog) {
      setIsOpen(true);
      sessionStorage.setItem("hasSeenWelcomeDialog", "true");
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-card text-foreground border-border max-w-sm p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-center text-xl font-bold text-primary">
            စာဖတ်ပေးပါဦးဗျ..
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-4 text-center text-muted-foreground">
            <p className="font-bold text-lg text-accent">အာဝါးး</p>
            <p>
                ငွေဖြည့်တဲ့အခါ မနက် 9နာရီ မှ ည 10 နာရီအတွင်းထည့်ပါက Account ထဲသို့ 3min မှ 15minအတွင်းရောက်လာမှာဖြစ်ပါတယ်
            </p>
            <div className="w-full h-px bg-border"></div>
            <p>
                ကြိုတင်ငွေဖြည့်သွင်းထားပါက 24နာရီ ကိုယ်ကြိုက်တဲ့အချိန် ဝယ်ယူနိုင်ပါပြီ ဖြစ်ပါတယ်ဗျ
            </p>
            <p className="font-semibold text-green-400">
                အခုဝယ် အခုရမစောင့်ရပါဘူး
            </p>
        </div>
         <DialogClose asChild>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 h-8 w-8 text-muted-foreground hover:bg-muted"
                onClick={handleClose}
            >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
            </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
