"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import VideoCall from "@/components/VideoCall";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";

export default function CallPage() {
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get("/api/auth/me");
  //     setUser(res.data.user);
  //   };
  //   fetchUser();
  // }, []);
  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
    //  fetchAppointments();
  }, [session]);

  console.log("Current user in call page:", user);

  if (!user) return <Loader />;

  // instead of user.userId directly
  const sessionUid = `${user.userId}_${Date.now()}`; // unique per join

  return (
    <div className="h-screen bg-black">
      <VideoCall appointmentId={params.id} userId={sessionUid} />
    </div>
  );
}
