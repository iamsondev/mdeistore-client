import { cookies } from "next/headers";
import { ProfileClient } from "@/components/modules/customer/ProfileClient";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const cookieStore = await cookies();

  const sessionRes = await fetch("http://localhost:3000/api/auth/get-session", {
    headers: { Cookie: cookieStore.toString() },
  });
  const session = await sessionRes.json();
  const user = session?.user;

  return (
    <div className="p-10 max-w-xl">
      <h1 className="text-2xl font-bold mb-8">My Profile</h1>
      <ProfileClient user={user} />
    </div>
  );
}
