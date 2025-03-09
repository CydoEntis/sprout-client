import { Button, ButtonProps } from "@mantine/core";
import { GoogleIcon } from "./GoogleIcon";
type Props = {
  onClick: () => void;
};

export function GoogleAuthButton(props: ButtonProps & Props) {
  return (
    <Button leftSection={<GoogleIcon />} variant="default" {...props}>
      Continue with Google
    </Button>
  );
}
