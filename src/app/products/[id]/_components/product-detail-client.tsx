"use client";

import { useState } from "react";
import type { TopUpCategory, TopUpOption } from "@/lib/top-up-options";
import { TopUpCard } from "./top-up-card";
import { PurchaseDialog } from "./purchase-dialog";

interface ProductDetailClientProps {
  categories: TopUpCategory[];
}

export function ProductDetailClient({ categories }: ProductDetailClientProps) {
  const [selectedOption, setSelectedOption] = useState<TopUpOption | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (option: TopUpOption) => {
    setSelectedOption(option);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedOption(null);
  };

  return (
    <>
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
        />
      )}
    </>
  );
}
