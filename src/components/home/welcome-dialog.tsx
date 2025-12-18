"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenDialog = sessionStorage.getItem("hasSeenWelcomeDialog");
    if (!hasSeenDialog) {
      setIsOpen(true);
      sessionStorage.setItem("hasSeenWelcomeDialog", "true");
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-card text-foreground border-border max-w-sm p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-center text-xl font-bold text-primary">
            စာဖတ်ပေးပါဦးဗျ..
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-center text-muted-foreground">
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
      </DialogContent>
    </Dialog>
  );
}
