import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function AuthModal({
  open,
  setOpen,
  mode,
  setMode,
}) {

  const user = useAuthStore((s) => s.user);

  // 👇 Close modal when user logs in
  useEffect(() => {
    if (user) {
      setOpen(false);
    }
  }, [user, setOpen]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="sm:max-w-[420px]">

        <DialogHeader>
          <DialogTitle>
            {mode === "login"
              ? "Welcome Back"
              : "Create Account"}
          </DialogTitle>
        </DialogHeader>

        {/* Forms */}
        {mode === "login" ? (
          <Login isModal />
        ) : (
          <Signup isModal />
        )}

        {/* Switch */}
        <div className="text-center text-sm mt-4">

          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto"
                onClick={() => setMode("signup")}
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto"
                onClick={() => setMode("login")}
              >
                Login
              </Button>
            </>
          )}

        </div>

      </DialogContent>

    </Dialog>
  );
}
