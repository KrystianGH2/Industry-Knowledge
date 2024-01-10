"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import ReportForm from "../(components)/ReportForm";
const ClientMember = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Member");
    },
  });
  return (
    <div>
      <h1>Member Client Session</h1>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
      <ReportForm />
    </div>
  );
};

export default ClientMember;
