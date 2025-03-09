import { Anchor, Button, Group, PasswordInput, TextInput, Flex, Stack, Divider } from "@mantine/core";
import { AtSign, Lock } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { Link, useNavigate } from "@tanstack/react-router";

import useFormErrorHandler from "../../../hooks/useFormErrorHandler";
import { ErrorResponse } from "../../../api/errors/errror.types";
import { useLogin } from "../services/login.service";
import { loginSchema } from "../shared/auth.schemas";
import { LoginRequest } from "../shared/auth.types";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import AuthCard from "./AuthCard";
import { useGoogleLogin } from "../services/google-login.service";
const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;

function LoginForm() {
  const { isPending, mutateAsync: login } = useLogin();
  const { isPending: isPendingGoogle, mutateAsync: googleLogin } = useGoogleLogin();
  const navigate = useNavigate();

  const { handleAuthFormErrors } = useFormErrorHandler<LoginRequest>();

  const form = useForm<LoginRequest>({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(credentials: LoginRequest) {
    try {
      await login(credentials);
      form.reset();
      navigate({ to: "/categories" });
    } catch (err) {
      handleAuthFormErrors(err as ErrorResponse, form);
    }
  }

  async function handleDemoUserLogin() {
    try {
      await login({
        email: demoEmail,
        password: demoPassword,
      });
      form.reset();
      navigate({ to: "/categories" });
    } catch (err) {
      handleAuthFormErrors(err as ErrorResponse, form);
    }
  }

  async function handleGoogleLogin(credentialResponse: GoogleCredentialResponse) {
    try {
      if (credentialResponse.credential) {
        await googleLogin({
          idToken: credentialResponse.credential,
        });
        form.reset();
        navigate({ to: "/categories" });
      }
    } catch (err) {
      handleAuthFormErrors(err as ErrorResponse, form);
    }
  }

  return (
    <AuthCard title="Welcome Back!" anchorLabel="Don't have an account?" anchorText="Create an account" to="/register">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack my={8}>
          <Divider label="Login with Demo Accounts" />
          <Flex gap={4} w="100%">
            <Button
              type="button"
              w="100%"
              radius="xl"
              variant="light"
              color="lime"
              onClick={handleDemoUserLogin}
              loading={isPending || isPendingGoogle}
              disabled={isPending || isPendingGoogle}
            >
              User Account
            </Button>
            <Button
              type="button"
              w="100%"
              radius="xl"
              variant="light"
              color="lime"
              onClick={handleDemoUserLogin}
              loading={isPending || isPendingGoogle}
              disabled={isPending || isPendingGoogle}
            >
              Admin Account
            </Button>
          </Flex>
        </Stack>
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.error("Login Failed")} />
        <TextInput
          label="Email"
          placeholder="you@example.com"
          leftSection={<AtSign size={20} />}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          withAsterisk
          required
          mt="md"
          leftSection={<Lock size={20} />}
          {...form.getInputProps("password")}
        />

        <Group justify="end" mt="lg">
          <Anchor component={Link} size="sm" c="lime" to={"/forgot-password"}>
            Forgot password?
          </Anchor>
        </Group>

        <Flex mt="xl" gap="sm">
          <Button
            w="100%"
            color="lime"
            variant="light"
            type="submit"
            loading={isPending || isPendingGoogle}
            disabled={isPending || isPendingGoogle}
          >
            Login
          </Button>
        </Flex>
      </form>
    </AuthCard>
  );
}

export default LoginForm;
