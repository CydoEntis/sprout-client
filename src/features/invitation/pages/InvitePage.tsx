import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedInviteToken } from "../shared/invitation.types";
import InviteCard from "../components/InviteCard";

function InvitePage() {
  const { inviteToken } = useParams({ from: "/_authenticated/invite/$inviteToken" });
  const [invite, setInvite] = useState<DecodedInviteToken | null>(null);
  const [members, setMembers] = useState<string[]>([]);

  const acceptInviteHandler = () => {
    console.log("Invite accepted");
  };

  const declineInviteHandler = () => {
    console.log("Invite declined");
  };

  useEffect(() => {
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
  }, [inviteToken]);

  if (!invite) {
    return <div>Loading...</div>;
  }

  return (
    <InviteCard invite={invite} members={members} onAccept={acceptInviteHandler} onDecline={declineInviteHandler} />
  );
}

export default InvitePage;
