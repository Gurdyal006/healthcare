"use client";

import axiosInstance from "@/lib/axios";
import { useEffect, useRef, useState } from "react";

export default function VideoCall({ appointmentId, userId }: any) {
  const localRef = useRef<HTMLDivElement>(null);
  const remoteRef = useRef<HTMLDivElement>(null);

  const [client, setClient] = useState<any>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  useEffect(() => {
    let rtcClient: any;
    let localTracks: any[] = [];

    const start = async () => {
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

      rtcClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

      const channel = `appointment_${appointmentId}`;

      const res = await axiosInstance(
        `/api/agora-token?channel=${channel}&uid=${userId}`
      );
      const data = res?.data;

      await rtcClient.join(
        process.env.NEXT_PUBLIC_AGORA_APP_ID!,
        channel,
        data.token,
        userId
      );

      localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

      localTracks[1].play(localRef.current!);
      await rtcClient.publish(localTracks);

      rtcClient.on("user-published", async (user: any, mediaType: any) => {
        await rtcClient.subscribe(user, mediaType);

        if (mediaType === "video") {
          user.videoTrack.play(remoteRef.current!);
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      setClient(rtcClient);
      setTracks(localTracks);
    };

    start();

    return () => {
      localTracks.forEach((t) => t.stop());
      rtcClient?.leave();
    };
  }, [appointmentId, userId]);

  // 🎙 MUTE
  const toggleMute = async () => {
    if (!tracks[0]) return;
    await tracks[0].setEnabled(muted);
    setMuted(!muted);
  };

  // 📷 CAMERA
  const toggleCamera = async () => {
    if (!tracks[1]) return;
    await tracks[1].setEnabled(cameraOff);
    setCameraOff(!cameraOff);
  };

  // ❌ END CALL
  const endCall = async () => {
    tracks.forEach((t) => t.stop());
    await client?.leave();
    window.location.href = "/profile"; // redirect
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">

      {/* VIDEO GRID */}
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        <div
          ref={localRef}
          className="bg-black rounded-xl overflow-hidden"
        />
        <div
          ref={remoteRef}
          className="bg-black rounded-xl overflow-hidden"
        />
      </div>

      {/* CONTROLS */}
      <div className="flex justify-center gap-6 p-4 bg-gray-800">

        <button
          onClick={toggleMute}
          className={`px-4 py-2 rounded-full ${
            muted ? "bg-red-500" : "bg-gray-600"
          }`}
        >
          {muted ? "Unmute" : "Mute"}
        </button>

        <button
          onClick={toggleCamera}
          className={`px-4 py-2 rounded-full ${
            cameraOff ? "bg-red-500" : "bg-gray-600"
          }`}
        >
          {cameraOff ? "Camera On" : "Camera Off"}
        </button>

        <button
          onClick={endCall}
          className="px-6 py-2 bg-red-600 rounded-full"
        >
          End Call
        </button>

      </div>
    </div>
  );
}