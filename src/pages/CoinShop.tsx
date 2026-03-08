import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Coins, ShoppingBag, Sparkles, Palette, Shield, Zap, Lock, CheckCircle2, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  category: "avatar" | "theme" | "powerup" | "title";
  price: number;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const SHOP_ITEMS: ShopItem[] = [
  // Avatars
  { id: "avatar_ninja", name: "Ninja", description: "Silent but deadly test-taker", category: "avatar", price: 50, icon: "🥷", rarity: "common" },
  { id: "avatar_wizard", name: "Wizard", description: "Master of mathematical arts", category: "avatar", price: 100, icon: "🧙", rarity: "rare" },
  { id: "avatar_astronaut", name: "Astronaut", description: "Reaching for the stars", category: "avatar", price: 200, icon: "🧑‍🚀", rarity: "epic" },
  { id: "avatar_dragon", name: "Dragon", description: "Legendary score destroyer", category: "avatar", price: 500, icon: "🐉", rarity: "legendary" },
  { id: "avatar_robot", name: "Robot", description: "Calculated precision", category: "avatar", price: 75, icon: "🤖", rarity: "common" },
  { id: "avatar_crown", name: "Royal", description: "Born to rule the leaderboard", category: "avatar", price: 300, icon: "👑", rarity: "epic" },
  // Themes
  { id: "theme_midnight", name: "Midnight Blue", description: "Deep ocean dark theme", category: "theme", price: 150, icon: "🌊", rarity: "rare" },
  { id: "theme_sunset", name: "Sunset Glow", description: "Warm orange gradient vibes", category: "theme", price: 150, icon: "🌅", rarity: "rare" },
  { id: "theme_forest", name: "Forest Green", description: "Calming nature palette", category: "theme", price: 150, icon: "🌲", rarity: "rare" },
  { id: "theme_galaxy", name: "Galaxy", description: "Cosmic purple and stars", category: "theme", price: 400, icon: "🌌", rarity: "legendary" },
  // Power-ups
  { id: "powerup_hint", name: "Hint Pack (5)", description: "Get hints on tough questions", category: "powerup", price: 30, icon: "💡", rarity: "common" },
  { id: "powerup_freeze", name: "Time Freeze (3)", description: "Pause the timer in timed modes", category: "powerup", price: 60, icon: "❄️", rarity: "rare" },
  { id: "powerup_double", name: "2x XP (1 hour)", description: "Double all XP earned", category: "powerup", price: 100, icon: "⚡", rarity: "rare" },
  { id: "powerup_skip", name: "Skip Token (3)", description: "Skip a question without penalty", category: "powerup", price: 40, icon: "⏭️", rarity: "common" },
  // Titles
  { id: "title_scholar", name: "Scholar", description: "Display 'Scholar' next to your name", category: "title", price: 200, icon: "📜", rarity: "epic" },
  { id: "title_champion", name: "Champion", description: "Display 'Champion' badge", category: "title", price: 350, icon: "🏆", rarity: "epic" },
  { id: "title_legend", name: "Legend", description: "The ultimate title", category: "title", price: 1000, icon: "⭐", rarity: "legendary" },
];

const RARITY_COLORS: Record<string, string> = {
  common: "bg-muted text-muted-foreground",
  rare: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  epic: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  legendary: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
};

const CATEGORY_ICONS: Record<string, any> = {
  avatar: Sparkles,
  theme: Palette,
  powerup: Zap,
  title: Shield,
};

const CoinShop = () => {
  const { user } = useAuth();
  const [coins, setCoins] = useState(0);
  const [purchased, setPurchased] = useState<string[]>([]);
  const [filter, setFilter] = useState<"all" | "avatar" | "theme" | "powerup" | "title">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadCoins();
  }, [user]);

  const loadCoins = async () => {
    if (!user) return;
    // Sum earned credits as coins
    const { data } = await supabase
      .from('accelerator_credits')
      .select('earned_credits')
      .eq('user_id', user.id);
    const total = (data || []).reduce((sum, r) => sum + Number(r.earned_credits), 0);
    setCoins(Math.floor(total));

    // Load purchased items from achievements (using achievement_type as item id)
    const { data: achievements } = await supabase
      .from('achievements')
      .select('achievement_type')
      .eq('user_id', user.id);
    setPurchased((achievements || []).map(a => a.achievement_type).filter(t => t.startsWith('shop_')));
    setLoading(false);
  };

  const buyItem = async (item: ShopItem) => {
    if (!user) return;
    if (coins < item.price) {
      toast({ title: "Not enough coins!", description: `You need ${item.price - coins} more coins.`, variant: "destructive" });
      return;
    }
    if (purchased.includes(`shop_${item.id}`)) {
      toast({ title: "Already owned!", description: "You already have this item." });
      return;
    }

    // Deduct coins by inserting a negative credit
    const { error: creditErr } = await supabase.from('accelerator_credits').insert({
      user_id: user.id,
      credit_type: 'shop_purchase',
      earned_credits: -item.price,
      source_id: item.id,
      metadata: { item_name: item.name, category: item.category },
    });

    // Record purchase as achievement
    const { error: achErr } = await supabase.from('achievements').insert({
      user_id: user.id,
      achievement_type: `shop_${item.id}`,
    });

    if (creditErr || achErr) {
      toast({ title: "Purchase failed", description: "Please try again.", variant: "destructive" });
      return;
    }

    setCoins(c => c - item.price);
    setPurchased(p => [...p, `shop_${item.id}`]);

    // If avatar purchased, update profile emoji
    if (item.category === "avatar") {
      await supabase.from('profiles').update({ avatar_emoji: item.icon }).eq('id', user.id);
    }

    toast({ title: "Purchase complete! 🎉", description: `You bought ${item.name}` });
  };

  const filtered = filter === "all" ? SHOP_ITEMS : SHOP_ITEMS.filter(i => i.category === filter);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
            <h1 className="text-xl font-bold text-foreground">Coin Shop</h1>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30">
            <Coins className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="font-bold text-amber-700 dark:text-amber-300">{coins}</span>
          </div>
        </div>

        {!user && (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground mb-3">Sign in to access the shop</p>
            <Link to="/auth"><Button>Sign In</Button></Link>
          </Card>
        )}

        {user && (
          <>
            {/* Category Filter */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {(["all", "avatar", "theme", "powerup", "title"] as const).map(cat => (
                <Button key={cat} size="sm" variant={filter === cat ? "default" : "outline"} onClick={() => setFilter(cat)} className="capitalize shrink-0">
                  {cat === "all" ? "All" : cat === "powerup" ? "Power-ups" : cat.charAt(0).toUpperCase() + cat.slice(1) + "s"}
                </Button>
              ))}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((item, idx) => {
                const owned = purchased.includes(`shop_${item.id}`);
                const canAfford = coins >= item.price;
                const CatIcon = CATEGORY_ICONS[item.category];

                return (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                    <Card className={`p-4 relative ${owned ? 'border-green-500/50 bg-green-50/50 dark:bg-green-900/10' : ''}`}>
                      {owned && <CheckCircle2 className="w-5 h-5 text-green-500 absolute top-2 right-2" />}
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <h3 className="font-semibold text-sm text-foreground">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <Badge className={RARITY_COLORS[item.rarity] + " text-[10px]"}>{item.rarity}</Badge>
                        <CatIcon className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <Button size="sm" className="w-full gap-1" disabled={owned || !canAfford} onClick={() => buyItem(item)} variant={owned ? "secondary" : canAfford ? "default" : "outline"}>
                        {owned ? "Owned" : (
                          <>
                            {!canAfford && <Lock className="w-3 h-3" />}
                            <Coins className="w-3 h-3" />
                            {item.price}
                          </>
                        )}
                      </Button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* How to earn */}
            <Card className="p-4 mt-6">
              <h3 className="font-semibold mb-2 text-foreground flex items-center gap-2"><Star className="w-4 h-4 text-amber-500" /> How to Earn Coins</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• Answer questions correctly (+2 coins each)</p>
                <p>• Complete daily quests (+bonus coins)</p>
                <p>• Maintain your streak (+5 coins/day)</p>
                <p>• Win boss battles (+20 coins)</p>
                <p>• Perfect quiz scores (+10 bonus coins)</p>
              </div>
            </Card>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default CoinShop;
