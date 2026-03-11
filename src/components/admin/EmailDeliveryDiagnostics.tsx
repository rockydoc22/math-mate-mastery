import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw } from "lucide-react";

interface EmailDiagnostic {
  recipientEmail: string;
  templateName: string;
  latestStatus: string;
  lastError: string | null;
  lastAttemptAt: string;
  attempts: number;
  lastMessageId: string | null;
}

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "sent":
      return "default";
    case "pending":
      return "secondary";
    case "failed":
    case "dlq":
      return "destructive";
    default:
      return "outline";
  }
};

const formatTemplateName = (value: string) =>
  value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const EmailDeliveryDiagnostics = () => {
  const [diagnostics, setDiagnostics] = useState<EmailDiagnostic[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDiagnostics = useCallback(async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("admin-email-diagnostics", {
        body: { limit: 100 },
      });

      if (error) throw error;

      setDiagnostics(Array.isArray(data?.diagnostics) ? data.diagnostics : []);
    } catch (error) {
      console.error("Error loading email diagnostics:", error);
      toast({
        title: "Error",
        description: "Failed to load email delivery diagnostics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDiagnostics();
  }, [loadDiagnostics]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-lg">Email Delivery Diagnostics</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Latest delivery outcome per recipient and template from the backend send log.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => void loadDiagnostics()} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading diagnostics...</p>
        ) : diagnostics.length === 0 ? (
          <p className="text-sm text-muted-foreground">No email delivery events found yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Recipient</th>
                  <th className="text-left py-2 pr-4">Template</th>
                  <th className="text-left py-2 pr-4">Status</th>
                  <th className="text-left py-2 pr-4">Last Error</th>
                  <th className="text-right py-2 pr-4">Attempts</th>
                  <th className="text-right py-2">Updated</th>
                </tr>
              </thead>
              <tbody>
                {diagnostics.map((item) => (
                  <tr key={`${item.recipientEmail}-${item.templateName}`} className="border-b align-top">
                    <td className="py-3 pr-4">
                      <div className="font-medium">{item.recipientEmail}</div>
                      {item.lastMessageId && (
                        <div className="text-xs text-muted-foreground mt-1">Message {item.lastMessageId.slice(0, 8)}...</div>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">{formatTemplateName(item.templateName)}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={getStatusVariant(item.latestStatus)}>{item.latestStatus}</Badge>
                    </td>
                    <td className="py-3 pr-4 max-w-xs">
                      <div className="text-muted-foreground break-words">
                        {item.lastError || "—"}
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-right">{item.attempts}</td>
                    <td className="py-3 text-right text-muted-foreground whitespace-nowrap">
                      {new Date(item.lastAttemptAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
