"use client";

import { useEffect, useState } from "react";

export default function WelcomePopup() {

  const [open, setOpen] =
    useState(false);

  useEffect(() => {

    const seen =
      localStorage.getItem(
        "welcome-popup"
      );

    if (!seen) {

      setOpen(true);

      localStorage.setItem(
        "welcome-popup",
        "true"
      );
    }

  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">

      <div className="bg-white max-w-lg w-full rounded-[32px] p-10 shadow-2xl relative">

        <button
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-black"
        >
          ✕
        </button>

        <div className="text-center">

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-4xl mb-6">

            🤖

          </div>

          <h2 className="text-4xl font-black text-slate-900">

            Welcome to MedAI

          </h2>

          <p className="mt-5 text-slate-600 leading-relaxed">

            AI-powered healthcare platform helping patients discover specialists and book consultations instantly.

          </p>

          <div className="grid gap-4 mt-8">

            <button className="h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold">

              Start AI Consultation

            </button>

            <button
              onClick={() => setOpen(false)}
              className="h-14 rounded-2xl border border-slate-200 font-semibold"
            >
              Explore Platform
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}