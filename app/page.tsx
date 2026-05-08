import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HomePage from "./(website)/page";
import WelcomePopup from "@/components/WelcomePopup";

export default async function Home() {
//   const session = await getServerSession(authOptions);

//   if (session) {
//     redirect("/dashboard");
//   } else {
//     redirect("/login");
//   }
// }

  return (
    <div>
      {/* <WelcomePopup /> */}
     <HomePage />
    </div>
  );
}