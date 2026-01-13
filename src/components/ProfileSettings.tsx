import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Save, Camera, Lock, Smartphone, ChevronRight } from "lucide-react";

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Personal Information
            </h3>
            <p className="text-sm text-muted-foreground">
              This info will be visible across the platform.
            </p>
          </div>
          <Button className="gap-2">
            <Save size={18} />
            Save Changes
          </Button>
        </div>
        <CardContent className="p-6 space-y-8">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="w-24 h-24  border border-border">
                <AvatarImage
                  src="https://picsum.photos/seed/user/100/100"
                  alt="Avatar"
                />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center text-white cursor-pointer">
                <Camera size={24} />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-foreground">Your Photo</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Allowed JPG, GIF or PNG. Max size 800kB.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Upload New
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Remove
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Full Name
              </label>
              <Input
                type="text"
                defaultValue="Alex Rivera"
                className="rounded-xl bg-muted/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Email Address
              </label>
              <Input
                type="email"
                defaultValue="alex@billflow.io"
                className="rounded-xl bg-muted cursor-not-allowed"
                disabled
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Professional Bio
            </label>
            <Textarea
              rows={3}
              defaultValue="Product designer helping startups scale."
              className="rounded-xl bg-muted/40 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-6">Security</h3>
          <div className="space-y-4">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-4 hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">
                    Change Password
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Update your account password
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-4 hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <Smartphone size={20} className="text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">
                    Two-Factor Authentication
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
              </div>
              <Badge
                variant="default"
                className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
              >
                Enabled
              </Badge>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
