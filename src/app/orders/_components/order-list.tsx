'use client';

import { useMemo, useState, useEffect } from 'react';
import { useCollection, useUser } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderDetailDialog } from './order-detail-dialog';

type Order = {
  id: string;
  userId: string;
  productName: string;
  optionName: string;
  price: string;
  status: 'Completed' | 'Pending' | 'Failed';
  timestamp: string; // Changed from object to string
  gameId: string;
  serverId?: string;
};

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const statusConfig = {
    Completed: {
      text: 'Success',
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

  return <Badge className={`rounded-full px-3 py-1 text-xs ${className}`}>{text}</Badge>;
};

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead><Skeleton className="h-5 w-16" /></TableHead>
                    <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                    <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                    <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                         <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  </div>
);

const ORDERS_PER_PAGE = 10;

export function OrderList() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const ordersQuery = useMemo(() => {
    if (!user) return null;
    return query(
      collection(firestore, `users/${user.uid}/orders`),
      orderBy('timestamp', 'desc')
    );
  }, [user, firestore]);

  const { data: orders, isLoading, error } = useCollection<Order>(
    ordersQuery as any
  );
  
  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };
  
  const handleDialogClose = () => {
      setIsDialogOpen(false);
      setSelectedOrder(null);
  }

  useEffect(() => {
    const checkPendingOrders = () => {
        if (!orders || !user) return;

        const now = new Date().getTime();
        const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;

        orders.forEach(order => {
            if (order.status === 'Pending') {
                const orderTime = new Date(order.timestamp).getTime();
                if (now - orderTime > FIFTEEN_MINUTES_IN_MS) {
                    const orderDocRef = doc(firestore, `users/${user.uid}/orders`, order.id);
                    updateDocumentNonBlocking(orderDocRef, { status: 'Completed' });
                }
            }
        });
    };

    // Run once on load and then every 30 seconds
    checkPendingOrders();
    const intervalId = setInterval(checkPendingOrders, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [orders, user, firestore]);
  
  const paginatedOrders = useMemo(() => {
    if (!orders) return [];
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const endIndex = startIndex + ORDERS_PER_PAGE;
    return orders.slice(startIndex, endIndex);
  }, [orders, currentPage]);

  const pageCount = useMemo(() => {
    return orders ? Math.ceil(orders.length / ORDERS_PER_PAGE) : 0;
  }, [orders]);


  if (isUserLoading || (isLoading && !orders)) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <p className="py-10 text-center text-destructive">Error loading orders. Please try again later.</p>;
  }

  if (!orders || orders.length === 0) {
    return <p className="py-10 text-center text-muted-foreground">No orders found.</p>;
  }
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pageCount) {
        setCurrentPage(page);
    }
  }

  const renderPagination = () => {
    if (pageCount <= 1) return null;
    
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} />
          </PaginationItem>
          {startPage > 1 && (
            <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(1); }}>1</PaginationLink>
            </PaginationItem>
          )}
          {startPage > 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

          {pages.map(page => (
             <PaginationItem key={page}>
                <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(page); }} isActive={currentPage === page}>
                    {page}
                </PaginationLink>
            </PaginationItem>
          ))}

          {endPage < pageCount - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
          {endPage < pageCount && (
             <PaginationItem>
                <PaginationLink href="#" onClick={(e) => { e
                .preventDefault(); handlePageChange(pageCount); }}>{pageCount}</PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };


  return (
    <>
    <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
       <h2 className="text-center text-lg font-bold mb-4 text-primary">ဝယ်ယူမှုမှတ်တမ်းများ</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-foreground font-semibold">Time</TableHead>
              <TableHead className="text-foreground font-semibold">Game</TableHead>
              <TableHead className="text-foreground font-semibold">Item</TableHead>
              <TableHead className="text-foreground font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id} onClick={() => handleRowClick(order)} className="cursor-pointer">
                <TableCell className="text-xs text-muted-foreground">
                    {new Date(order.timestamp).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.productName}</TableCell>
                 <TableCell>{order.optionName}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {renderPagination()}
    </div>
    {selectedOrder && (
        <OrderDetailDialog 
            order={selectedOrder} 
            isOpen={isDialogOpen} 
            onClose={handleDialogClose} 
        />
    )}
    </>
  );
}
