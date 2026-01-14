import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";

export function TeamSettings() {
  const teamMembers = [
    {
      name: "Alex Rivera",
      email: "alex@billflow.io",
      role: "Owner",
      status: "Active",
      logoUrl: "https://picsum.photos/seed/user/32/32",
    },
    {
      name: "Sarah Chen",
      email: "sarah@billflow.io",
      role: "Accountant",
      status: "Active",
      logoUrl: "https://picsum.photos/seed/sarah/32/32",
    },
    {
      name: "Marcus Todd",
      email: "marcus@billflow.io",
      role: "Manager",
      status: "Pending",
      logoUrl: "https://picsum.photos/seed/marcus/32/32",
    },
  ];

  return (
    <Card className="rounded-2xl">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Manage Team</h3>
          <p className="text-sm text-muted-foreground">
            Collaborate with your coworkers.
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={18} /> Invite Member
        </Button>
      </div>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider">
                  User
                </TableHead>
                <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider">
                  Role
                </TableHead>
                <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-center">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member, i) => (
                <TableRow key={i} className="hover:bg-muted/50 group">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.logoUrl} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {member.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">
                    {member.role}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex justify-center">
                      <Badge
                        variant={
                          member.status === "Active" ? "default" : "secondary"
                        }
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          member.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                            : "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
                        }`}
                      >
                        {member.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    {member.role !== "Owner" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
