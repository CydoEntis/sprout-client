import { useParams, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedInviteToken } from "../shared/invitation.types";
import InviteCard from "../components/InviteCard";
import useAuthStore from "../../../stores/useAuthStore";

function InvitePage() {
  const { inviteToken } = useParams({ from: "/_authenticated/invite/$inviteToken" });
  const [invite, setInvite] = useState<DecodedInviteToken | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({
        to: "/login",
        search: { redirect: `/invite/${inviteToken}` },
      });
      return;
    }

    if (inviteToken) {
      try {
        const decoded = jwtDecode<DecodedInviteToken>(inviteToken);
        setInvite(decoded);

        const parsedMembers = decoded.members ? JSON.parse(decoded.members) : [];
        setMembers(Array.isArray(parsedMembers) ? parsedMembers : []);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [inviteToken, isAuthenticated, navigate]);

  if (!invite) {
    return <div>Loading...</div>;
  }

  return (
    <InviteCard
      invite={invite}
      members={members}
      onAccept={function (): void {
        throw new Error("Function not implemented.");
      }}
      onDecline={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
}

export default InvitePage;
