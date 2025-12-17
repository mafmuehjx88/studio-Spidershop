"use client";

import { useState } from "react";
import type { TopUpCategory, TopUpOption } from "@/lib/top-up-options";
import { TopUpCard } from "./top-up-card";
import { PurchaseDialog } from "./purchase-dialog";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface ProductDetailClientProps {
  categories: TopUpCategory[];
  productId: string;
}

const GuestPrompt = () => (
    <Card className="bg-card border border-border p-4 mb-8 text-center space-y-4">
        <p className="text-destructive font-semibold">အကောင့်ဝင်ပြီးမှသာ ဝယ်ယူနိုင်မှာဖြစ်ပါတယ်</p>
        <div className="flex gap-4 justify-center">
            <Button asChild className="bg-gray-600 hover:bg-gray-700 text-white w-full">
                <Link href="/login">အကောင့်ဝင်ရန်</Link>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white w-full">
                <Link href="/register">အကောင့်သစ်ဖွင့်ရန်</Link>
            </Button>
        </div>
    </Card>
);

export function ProductDetailClient({ categories, productId }: ProductDetailClientProps) {
  const { user } = useUser();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<TopUpOption | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (option: TopUpOption) => {
    if (!user) {
        router.push("/register");
    } else {
        setSelectedOption(option);
        setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedOption(null);
  };

  return (
    <>
      {!user && <GuestPrompt />}
      <div className="space-y-10">
        {categories.map((category, index) => (
          <section key={category.id}>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500 text-white font-bold text-sm">
                {index + 1}
              </span>
              <h2 className="text-xl font-bold text-primary">{category.title}</h2>
            </div>
            <div className={`grid ${category.gridCols || 'grid-cols-2 md:grid-cols-4'} gap-4`}>
              {category.options.map((option) => (
                <TopUpCard key={option.id} option={option} onCardClick={handleCardClick} />
              ))}
            </div>
          </section>
        ))}
      </div>
      {selectedOption && (
        <PurchaseDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          option={selectedOption}
          productId={productId}
        />
      )}
    </>
  );
}
