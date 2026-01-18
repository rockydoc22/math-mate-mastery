import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, UserPlus, Check, X, Search, Flame } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  username: string;
  avatar_emoji: string;
}

interface Friendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: string;
  created_at: string;
  profile?: Profile;
}

const Friends = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Friendship[]>([]);
  const [requests, setRequests] = useState<Friendship[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFriendships = async () => {
    if (!user) return;

    const { data: friendships } = await supabase
      .from("friendships")
      .select("*")
      .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);

    // Use profiles_public view to avoid exposing email addresses
    const { data: profiles } = await supabase.from("profiles_public").select("id, username, avatar_emoji");
    const profileMap = new Map(profiles?.map((p) => [p.id, p]) || []);

    const accepted: Friendship[] = [];
    const pending: Friendship[] = [];

    friendships?.forEach((f) => {
      const friendId = f.requester_id === user.id ? f.addressee_id : f.requester_id;
      const friendship = { ...f, profile: profileMap.get(friendId) };
      
      if (f.status === "accepted") {
        accepted.push(friendship);
      } else if (f.status === "pending" && f.addressee_id === user.id) {
        pending.push(friendship);
      }
    });

    setFriends(accepted);
    setRequests(pending);
    setLoading(false);
  };

  useEffect(() => {
    fetchFriendships();
  }, [user]);

  const searchUsers = async () => {
    if (!searchQuery.trim() || !user) return;

    // Use profiles_public view to avoid exposing email addresses
    const { data } = await supabase
      .from("profiles_public")
      .select("id, username, avatar_emoji")
      .ilike("username", `%${searchQuery}%`)
      .neq("id", user.id)
      .limit(10);

    setSearchResults(data || []);
  };

  const sendRequest = async (friendId: string) => {
    if (!user) return;

    const { error } = await supabase.from("friendships").insert({
      requester_id: user.id,
      addressee_id: friendId,
    });

    if (error) {
      toast({ title: "Could not send request", variant: "destructive" });
    } else {
      toast({ title: "Friend request sent!" });
      setSearchResults((prev) => prev.filter((p) => p.id !== friendId));
    }
  };

  const respondToRequest = async (friendshipId: string, accept: boolean) => {
    const status = accept ? "accepted" : "declined";
    await supabase.from("friendships").update({ status }).eq("id", friendshipId);
    toast({ title: accept ? "Friend added!" : "Request declined" });
    fetchFriendships();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
        <Card className="p-8 text-center max-w-md">
          <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Friends</h2>
          <p className="text-muted-foreground mb-4">Sign in to add friends and see their progress!</p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="w-8 h-8 text-primary" />
              Friends
            </h1>
            <p className="text-muted-foreground">Connect with other students</p>
          </div>
        </div>

        {/* Add Friend */}
        <Card className="p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchUsers()}
            />
            <Button onClick={searchUsers}>
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="mt-4 space-y-2">
              {searchResults.map((profile) => (
                <div key={profile.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{profile.avatar_emoji || "😎"}</span>
                    <span className="font-medium">{profile.username}</span>
                  </div>
                  <Button size="sm" onClick={() => sendRequest(profile.id)}>
                    <UserPlus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Tabs defaultValue="friends">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="friends">Friends ({friends.length})</TabsTrigger>
            <TabsTrigger value="requests">
              Requests {requests.length > 0 && `(${requests.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="mt-4">
            {loading ? (
              <Card className="p-8 text-center text-muted-foreground">Loading...</Card>
            ) : friends.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No friends yet. Search for users to add!</p>
              </Card>
            ) : (
              <div className="space-y-2">
                {friends.map((f) => (
                  <Card key={f.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{f.profile?.avatar_emoji || "😎"}</span>
                      <span className="font-medium">{f.profile?.username || "Unknown"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Flame className="w-4 h-4 text-orange-500" />
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="requests" className="mt-4">
            {requests.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No pending requests</p>
              </Card>
            ) : (
              <div className="space-y-2">
                {requests.map((r) => (
                  <Card key={r.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{r.profile?.avatar_emoji || "😎"}</span>
                      <span className="font-medium">{r.profile?.username || "Unknown"}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => respondToRequest(r.id, true)}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => respondToRequest(r.id, false)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Friends;
