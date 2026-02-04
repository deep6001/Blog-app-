import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Home,
  PenSquare,
  User,
  FileText,
  LogOut,
  UserPlus,
  ChevronDown,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useAuthStore } from "../store/authStore";

import AuthModal from "./Authmodel";

export default function AppSidebar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  console.log(user);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");

  /* Open Modal */
  const openAuth = (type = "login") => {
    setMode(type);
    setOpen(true);
  };

  /* Create Post */
  const createPost = () => {
    if (!user) {
      openAuth("login");
    } else {
      navigate("/create");
    }
  };

  const navigationItems = [
    {
      title: "All Blogs",
      url: "/",
      icon: Home,
    },

    ...(user
      ? [
          {
            title: "Profile",
            url: "/profile",
            icon: User,
          },
          {
            title: "My Posts",
            url: "/myposts",
            icon: FileText,
          },
        ]
      : []),
  ];

  return (
    <>
      <Sidebar collapsible="icon">

        {/* Header */}
        <SidebarHeader>

          <SidebarMenu>
            <SidebarMenuItem>

              <SidebarMenuButton asChild>
                <Link to="/" className="flex items-center gap-2">

                  <PenSquare className="w-6 h-6" />

                  <span className="text-lg font-bold">
                    Mini Blog
                  </span>

                </Link>
              </SidebarMenuButton>

            </SidebarMenuItem>
          </SidebarMenu>

        </SidebarHeader>

        <SidebarSeparator />

        {/* Content */}
        <SidebarContent>

          <SidebarGroup>

            <SidebarGroupLabel>
              Navigation
            </SidebarGroupLabel>

            <SidebarGroupContent>

              <SidebarMenu>

                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>

                    <SidebarMenuButton asChild>

                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>

                    </SidebarMenuButton>

                  </SidebarMenuItem>
                ))}

                {/* Create Post */}
                <SidebarMenuItem>

                  <SidebarMenuButton onClick={createPost}>

                    <PenSquare />
                    <span>Create Post</span>

                  </SidebarMenuButton>

                </SidebarMenuItem>

              </SidebarMenu>

            </SidebarGroupContent>

          </SidebarGroup>

        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>

          <SidebarMenu>

            <SidebarMenuItem>

              {/* Guest */}
              {!user ? (

                <SidebarMenuButton
                  onClick={() => openAuth("login")}
                >

                  <UserPlus />

                  <span>
                    Login / Signup
                  </span>

                </SidebarMenuButton>

              ) : (

                /* Logged In */
                <DropdownMenu>

                  <DropdownMenuTrigger asChild>

                    <SidebarMenuButton>

                      <Avatar className="h-8 w-8">

                        <AvatarFallback>
                          {user.username[0].toUpperCase()}
                        </AvatarFallback>

                      </Avatar>

                      <div className="flex flex-col items-start ml-2">

                        <span className="text-sm font-medium">
                          {user.username}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>

                      </div>

                      <ChevronDown className="ml-auto" />

                    </SidebarMenuButton>

                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    side="top"
                    className="w-[200px]"
                  >

                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link to="/myposts">
                        My Posts
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link to="/settings">
                        Settings
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>

                  </DropdownMenuContent>

                </DropdownMenu>

              )}

            </SidebarMenuItem>

          </SidebarMenu>

        </SidebarFooter>

      </Sidebar>

      {/* Modal */}
      <AuthModal
        open={open}
        setOpen={setOpen}
        mode={mode}
        setMode={setMode}
      />
    </>
  );
}
