import { useAuthStore } from "../store/authStore";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  User,
  Mail,
  Calendar,
  FileText,
  LogOut,
  Edit,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [postCount, setPostCount] = useState(0);

  /* =====================
     Fetch My Posts
  ===================== */
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {

      const res = await api.get("/posts/myPosts");

      
      if (res.data) {
        setPostCount(res.data.length);
      }


    } catch (err) {
      console.log(err);

    }
  };



  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Page Title */}
      <h1 className="text-3xl font-bold">
        My Profile
      </h1>

      {/* Top Card */}
      <Card>

        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">

          {/* Avatar */}
          <Avatar className="h-24 w-24 text-2xl">
            <AvatarFallback>
              {user.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">

            <h2 className="text-2xl font-semibold">
              {user.username}
            </h2>

            <div className="flex flex-col md:flex-row gap-3 text-muted-foreground mt-2">

              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </span>

              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Joined{" "}
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </span>

            </div>

          </div>

          {/* Actions */}
          <div className="flex gap-2">

            <Button
              variant="destructive"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>

          </div>

        </CardContent>

      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4" />
              My Posts
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {postCount || 0}
            </p>
            <p className="text-muted-foreground text-sm">
              Total posts created
            </p>
          </CardContent>
        </Card>

        {/* Username */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4" />
              Username
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-lg font-semibold">
              @{user.username}
            </p>
            <p className="text-muted-foreground text-sm">
              Public handle
            </p>
          </CardContent>
        </Card>

        {/* Email */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" />
              Email
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm font-medium break-all">
              {user.email}
            </p>
            <p className="text-muted-foreground text-sm">
              Login email
            </p>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
