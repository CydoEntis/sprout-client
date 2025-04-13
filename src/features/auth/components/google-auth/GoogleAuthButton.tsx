import { Button, ButtonProps } from "@mantine/core";
import { GoogleIcon } from "./GoogleIcon";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "../../shared/auth.types";
type Props = {
  onClick: (request: GoogleLogin) => void;
};

export function GoogleAuthButton(props: ButtonProps & Props) {
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      props.onClick({
        authorizationCode: codeResponse.code,
      });
    },
  });

  return (
    <Button
      bg="secondary.9"
      classNames={{ root: "button" }}
      leftSection={<GoogleIcon />}
      variant="default"
      {...props}
      onClick={() => googleLogin()}
    >
      Continue with Google
    </Button>
  );
}
