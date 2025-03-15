import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedInviteToken } from "../shared/invitation.types";

export function useInvite(inviteToken: string) {
  const [invite, setInvite] = useState<DecodedInviteToken | null>(null);
  const [members, setMembers] = useState<string[]>([]);

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

  return { invite, members };
}
