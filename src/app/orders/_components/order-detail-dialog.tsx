'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

type Order = {
  id: string;
  userId: string;
  productName: string;
  optionName: string;
  price: string;
  status: 'Completed' | 'Pending' | 'Failed';
  timestamp: string;
  gameId: string;
  serverId?: string;
};

interface OrderDetailDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const statusConfig = {
    Completed: {
      text: 'အောင်မြင်သည်',
      className: 'bg-green-600 hover:bg-green-700 text-white',
    },
    Pending: {
      text: 'စောင့်ဆိုင်းပါ',
      className: 'bg-yellow-500 hover:bg-yellow-600 text-black',
    },
    Failed: {
      text: 'မအောင်မြင်',
      className: 'bg-red-600 hover:bg-red-700 text-white',
    },
  };

  const { text, className } = statusConfig[status] || statusConfig.Pending;

  return <Badge className={`text-xs ${className}`}>{text}</Badge>;
};

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between items-center py-3 border-b border-border/50">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-semibold text-right">{value}</p>
    </div>
)


export function OrderDetailDialog({ order, isOpen, onClose }: OrderDetailDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card text-foreground border-border max-w-sm p-0">
        <DialogHeader className="p-4 border-b border-border/50 flex flex-row items-center justify-between">
          <DialogTitle className="text-lg">Order Detail – #{order.id.slice(0, 7).toUpperCase()}</DialogTitle>
           <DialogClose asChild>
            <button className="p-1 rounded-full hover:bg-muted">
                <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="p-4 text-sm">
            <DetailRow 
                label="GameID"
                value={
                    <span className="font-mono bg-muted px-2 py-1 rounded-sm">
                        {order.gameId}{order.serverId ? ` (${order.serverId})` : ''} ({order.productName})
                    </span>
                }
            />
            <DetailRow label="Item" value={order.optionName} />
            <DetailRow label="Price" value={`${parseInt(order.price.replace(/ks|,/gi, '')).toLocaleString()} Ks`} />
            <DetailRow label="Date" value={new Date(order.timestamp).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })} />
            <DetailRow label="အခြေအနေ" value={<StatusBadge status={order.status} />} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
