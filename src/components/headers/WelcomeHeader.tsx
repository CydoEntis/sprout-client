import { Title } from "@mantine/core";

type WelcomeHeaderProps = {
  username: string;
};

function WelcomeHeader({ username }: WelcomeHeaderProps) {
  return <Title>Welcome back, {username}</Title>;
}

export default WelcomeHeader;
