'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy } from 'lucide-react';

type Note = {
    id: string;
    title: string;
    content: string;
}

export const NoteCard = ({ note, onCopy }: { note: Note; onCopy: (text: string) => void; }) => {
  return (
    <Card className="bg-card border-red-500/50 border-2 overflow-hidden">
        <CardContent className="p-3 flex items-center gap-4">
             <div className="w-16 h-16 bg-card border-r border-border flex items-center justify-center">
                <p className="text-red-400 font-bold text-sm text-center">{note.title}</p>
            </div>
            <div className="flex-1">
                <p className="text-sm text-muted-foreground">{note.content}</p>
            </div>
             <Button variant="outline" size="sm" onClick={() => onCopy(note.content)} className="bg-gray-700 hover:bg-gray-600">
                <Copy className="h-4 w-4 mr-2" />
                Copy
            </Button>
        </CardContent>
    </Card>
  );
};
