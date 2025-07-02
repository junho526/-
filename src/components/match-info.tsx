'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Clock, ToyBrick, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import type { Player } from './chess-game';

interface MatchInfoProps {
  turn: Player;
  timers: { white: number; black: number };
  moveCount: number;
  onReset: () => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const PlayerInfo = ({ name, time, isActive }: { name: string; time: number; isActive: boolean }) => (
    <Card className={cn('transition-all', isActive ? 'bg-accent/30 border-accent' : 'bg-card/50 opacity-70')}>
        <CardHeader className="p-4">
            <CardTitle className="flex items-center justify-between text-lg font-headline">
                <span>{name}</span>
                <div className="flex items-center gap-2 text-base font-body">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(time)}</span>
                </div>
            </CardTitle>
        </CardHeader>
    </Card>
);


export default function MatchInfo({
  turn,
  timers,
  moveCount,
  onReset,
}: MatchInfoProps) {
  return (
    <Card className="w-full max-w-sm lg:w-80 shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-center text-3xl text-primary">Match Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <PlayerInfo name="Player (Black)" time={timers.black} isActive={turn === 'black'} />
        
        <div className="text-center py-2 space-y-2">
            <div className="flex items-center justify-center gap-4 text-lg">
                <ToyBrick className="h-5 w-5"/>
                <span>Move: {moveCount}</span>
            </div>
            <p className="font-bold text-xl capitalize text-primary">{turn}'s Turn</p>
        </div>
        
        <PlayerInfo name="Player (White)" time={timers.white} isActive={turn === 'white'} />

        <div className="pt-4">
            <Button onClick={onReset} variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset Game
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
