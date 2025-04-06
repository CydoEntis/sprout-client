import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import { Moon, Sun } from "lucide-react";
import useGetColorTheme from "../../hooks/useGetColorScheme";

function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const { isLightMode } = useGetColorTheme();

  return (
    <ActionIcon
      onClick={() => setColorScheme(isLightMode ? "dark" : "light")}
      variant="default"
      bg="primary.5"
      size="lg"
      aria-label="Toggle color scheme"
      classNames={{ 
        root: "button",
       }}
    >
      {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
    </ActionIcon>
  );
}

export default ThemeToggle;
