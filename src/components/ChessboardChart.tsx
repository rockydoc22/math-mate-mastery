import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const ChessboardChart = () => {
  const [activeSquare, setActiveSquare] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Calculate pennies for each square (2^(n-1))
  const getPennies = (square: number): bigint => {
    return BigInt(2) ** BigInt(square - 1);
  };

  // Format large numbers
  const formatNumber = (num: bigint): string => {
    if (num >= BigInt("1000000000000000000")) { // quintillion
      return `${(Number(num / BigInt("1000000000000000")) / 1000).toFixed(2)} quintillion`;
    } else if (num >= BigInt("1000000000000000")) { // quadrillion
      return `${(Number(num / BigInt("1000000000000")) / 1000).toFixed(2)} quadrillion`;
    } else if (num >= BigInt("1000000000000")) { // trillion
      return `${(Number(num / BigInt("1000000000")) / 1000).toFixed(2)} trillion`;
    } else if (num >= BigInt("1000000000")) { // billion
      return `${(Number(num / BigInt("1000000")) / 1000).toFixed(2)} billion`;
    } else if (num >= BigInt("1000000")) { // million
      return `${(Number(num / BigInt("1000")) / 1000).toFixed(2)} million`;
    } else if (num >= BigInt("1000")) {
      return Number(num).toLocaleString();
    }
    return num.toString();
  };

  // Format as Bitcoin (1 BTC ≈ 100,000 USD equivalent for illustration)
  const BTC_PER_USD = 1 / 100000; // ~$100k per BTC
  const formatBitcoin = (pennies: bigint): string => {
    const dollars = Number(pennies) / 100;
    const btc = dollars * BTC_PER_USD;
    if (btc >= 1e15) return `₿${(btc / 1e15).toFixed(2)} quadrillion`;
    if (btc >= 1e12) return `₿${(btc / 1e12).toFixed(2)} trillion`;
    if (btc >= 1e9) return `₿${(btc / 1e9).toFixed(2)} billion`;
    if (btc >= 1e6) return `₿${(btc / 1e6).toFixed(2)} million`;
    if (btc >= 1000) return `₿${btc.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    if (btc >= 1) return `₿${btc.toFixed(4)}`;
    if (btc >= 0.00001) return `₿${btc.toFixed(8)}`;
    // Show in satoshis (1 BTC = 100M sats)
    const sats = Math.round(btc * 1e8);
    return `${sats.toLocaleString()} sats`;
  };

  // Auto-play animation
  const playAnimation = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    
    setIsPlaying(true);
    setActiveSquare(1);
    
    let current = 1;
    const interval = setInterval(() => {
      current++;
      if (current > 64) {
        setIsPlaying(false);
        clearInterval(interval);
        return;
      }
      setActiveSquare(current);
    }, 150);
  };

  const reset = () => {
    setActiveSquare(1);
    setIsPlaying(false);
  };

  const currentPennies = getPennies(activeSquare);
  const totalPenniesUpToSquare = BigInt(2) ** BigInt(activeSquare) - BigInt(1);

  // Create 8x8 grid
  const squares = Array.from({ length: 64 }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      {/* Chessboard visualization */}
      <div className="grid grid-cols-8 gap-0.5 max-w-xs mx-auto">
        {squares.map((sq) => {
          const row = Math.floor((sq - 1) / 8);
          const col = (sq - 1) % 8;
          const isLight = (row + col) % 2 === 0;
          const isActive = sq <= activeSquare;
          const isCurrent = sq === activeSquare;
          
          return (
            <div
              key={sq}
              onClick={() => setActiveSquare(sq)}
              className={`
                aspect-square flex items-center justify-center cursor-pointer transition-all duration-150
                text-[8px] font-mono
                ${isLight 
                  ? isActive ? "bg-primary/80 text-primary-foreground" : "bg-muted"
                  : isActive ? "bg-primary text-primary-foreground" : "bg-muted-foreground/30"
                }
                ${isCurrent ? "ring-2 ring-amber-500 ring-offset-1 scale-110 z-10" : ""}
              `}
            >
              {sq <= 10 ? sq : ""}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" onClick={reset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={playAnimation}>
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <div className="flex-1 max-w-[200px]">
          <Slider
            value={[activeSquare]}
            onValueChange={([v]) => setActiveSquare(v)}
            min={1}
            max={64}
            step={1}
            disabled={isPlaying}
          />
        </div>
        <span className="text-sm font-mono w-8">#{activeSquare}</span>
      </div>

      {/* Stats */}
      <Card className="p-4 bg-gradient-to-r from-amber-500/10 to-primary/10 border-amber-500/30">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Pennies on square {activeSquare}</p>
            <p className="text-lg font-bold text-primary">{formatNumber(currentPennies)}</p>
            <p className="text-xs text-muted-foreground">{formatBitcoin(currentPennies)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total so far</p>
            <p className="text-lg font-bold text-amber-600">{formatNumber(totalPenniesUpToSquare)}</p>
            <p className="text-xs text-muted-foreground">{formatBitcoin(totalPenniesUpToSquare)}</p>
          </div>
        </div>
        
        {activeSquare === 64 && (
          <div className="mt-4 pt-4 border-t border-amber-500/30 text-center">
            <p className="text-sm font-semibold text-amber-600">
              ₿ Final total: Over ₿922 billion!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              That's ~46 million× Bitcoin's total supply of 21M!
            </p>
          </div>
        )}
      </Card>

      {/* Formula */}
      <div className="text-center text-xs text-muted-foreground">
        <p className="font-mono">
          Square n = 2<sup>(n-1)</sup> pennies
        </p>
        <p className="mt-1">
          Square {activeSquare}: 2<sup>{activeSquare - 1}</sup> = {activeSquare <= 20 ? Number(currentPennies).toLocaleString() : formatNumber(currentPennies)} pennies
        </p>
      </div>
    </div>
  );
};

export default ChessboardChart;
