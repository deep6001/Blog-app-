import { useAuthStore } from "../store/authStore";

import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-4">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <Card>
        <CardContent className="p-4">

          <p>
            Welcome back,
            <span className="font-semibold ml-2">
              {user?.username}
            </span>
          </p>

        </CardContent>
      </Card>

    </div>
  );
}
