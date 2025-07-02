'use client';

import Link from 'next/link';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="py-4 px-6 border-b bg-card">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-headline text-primary">
          <Link href="/">Checkmate Arena</Link>
        </h1>
        <nav>
          <Button asChild variant="ghost" size="icon">
            <Link href="/settings">
              <Settings className="h-6 w-6" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
