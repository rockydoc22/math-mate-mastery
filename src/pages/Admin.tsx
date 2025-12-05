import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Check, Eye, ShieldAlert } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface FlaggedQuestion {
  id: string;
  question_id: string;
  question_type: string;
  issue_type: string;
  notes: string | null;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Check if user has admin role
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin'
        });

        if (error) {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data === true);
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      checkAdminRole();
    }
  }, [user, authLoading]);

  const fetchFlaggedQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('flagged_questions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFlaggedQuestions(data || []);
    } catch (error) {
      console.error('Error fetching flagged questions:', error);
      toast({ title: "Error", description: "Failed to load flagged questions", variant: "destructive" });
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchFlaggedQuestions();
    }
  }, [isAdmin]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('flagged_questions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setFlaggedQuestions(prev => 
        prev.map(q => q.id === id ? { ...q, status } : q)
      );
      toast({ title: "Status updated" });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({ title: "Error updating status", variant: "destructive" });
    }
  };

  const deleteFlag = async (id: string) => {
    try {
      const { error } = await supabase
        .from('flagged_questions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setFlaggedQuestions(prev => prev.filter(q => q.id !== id));
      toast({ title: "Flag removed" });
    } catch (error) {
      console.error('Error deleting flag:', error);
      toast({ title: "Error removing flag", variant: "destructive" });
    }
  };

  const getIssueLabel = (type: string) => {
    const labels: Record<string, string> = {
      incorrect_answer: 'Incorrect Answer',
      typo: 'Typo',
      unclear: 'Unclear',
      offensive: 'Offensive',
      other: 'Other',
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'reviewed': return 'bg-blue-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Show loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">Loading...</CardContent>
        </Card>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Admin Access Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Please log in with an admin account to access this page.
            </p>
            <div className="flex gap-2">
              <Link to="/auth" className="flex-1">
                <Button className="w-full">Log In</Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <ShieldAlert className="w-5 h-5" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You don't have permission to access this page. Admin privileges are required.
            </p>
            <Link to="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Flagged Questions</h1>
          </div>
          <Badge variant="outline">{flaggedQuestions.length} total</Badge>
        </div>

        {flaggedQuestions.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-muted-foreground">No flagged questions yet.</CardContent></Card>
        ) : (
          <div className="space-y-4">
            {flaggedQuestions.map((flag) => (
              <Card key={flag.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">{flag.question_type.toUpperCase()}</Badge>
                        <Badge variant="outline">{getIssueLabel(flag.issue_type)}</Badge>
                        <Badge className={getStatusColor(flag.status)}>{flag.status}</Badge>
                      </div>
                      <p className="font-mono text-sm">Question ID: {flag.question_id}</p>
                      {flag.notes && <p className="text-sm text-muted-foreground">{flag.notes}</p>}
                      <p className="text-xs text-muted-foreground">
                        {new Date(flag.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {flag.status === 'pending' && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(flag.id, 'reviewed')}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      {flag.status !== 'resolved' && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(flag.id, 'resolved')}>
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="destructive" onClick={() => deleteFlag(flag.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
