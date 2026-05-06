import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string; 
    image?: string // ✅ add this
  }

  interface Session {
    user: {
      id: string;
      role: string; // ✅ add this
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string; // ✅ add this
    image?: string;
  }
}