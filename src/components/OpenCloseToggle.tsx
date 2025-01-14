import { Box } from "@mantine/core";
import { ChevronDown } from "lucide-react";

type OpenCloseToggleProps = {
  isOpen: boolean;
};

function OpenCloseToggle({ isOpen }: OpenCloseToggleProps) {
  return (
    <Box
      style={{
        display: "inline-block",
        transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <ChevronDown size={20} />
    </Box>
  );
}

export default OpenCloseToggle;
