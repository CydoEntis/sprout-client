import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Alert,
  Flex,
  Stack,
  Divider,
} from "@mantine/core";
import { AtSign, Lock } from "lucide-react";
// import { zodResolver } from "mantine-form-zod-resolver";
import { useForm, zodResolver } from "@mantine/form";
import { Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import AuthCard from "./components/AuthCard";
import { LoginRequest } from "./shared/auth.types";
import { loginSchema } from "./shared/auth.schemas";
// import { useLogin } from "../../api/auth";
// import { LoginRequest } from "../../shared/auth.types";
// import { loginSchema } from "../../shared/auth.schemas";
// import { ErrorResponse } from "../../../../api/errors/error.types";
// import useFormErrorHandler from "../../../../shared/hooks/useHandleErrors";

function LoginForm() {
  //   const login = useLogin();
  //   const navigate = useNavigate();

  //   const { error, handleAuthFormErrors, resetError } =
  //     useFormErrorHandler<LoginRequest>();

  const form = useForm<LoginRequest>({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <AuthCard
      title="Welcome Back!"
      anchorLabel="Don't have an account?"
      anchorText="Create an account"
      to="/register"
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack my={8}>
          <Divider label="Login with Demo Accounts" />
          <Flex gap={4} w="100%">
            <Button w="100%" radius="xl" variant="light" color="lime">
              User Account
            </Button>
            <Button w="100%" radius="xl" variant="light" color="lime">
              Admin Account
            </Button>
          </Flex>
        </Stack>

        <TextInput
          label="Email"
          placeholder="you@example.com"
          classNames={{
            input: "input",
          }}
          leftSection={<AtSign size={20} />}
          {...form.getInputProps("email")}
          onChange={(event) => {
            form.setFieldValue("email", event.currentTarget.value);
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          withAsterisk
          required
          mt="md"
          classNames={{
            input: "input",
          }}
          leftSection={<Lock size={20} />}
          {...form.getInputProps("password")}
          onChange={(event) => {
            form.setFieldValue("password", event.currentTarget.value);
          }}
        />
        <Group justify="end" mt="lg">
          <Anchor component={Link} size="sm" c="lime" to={"/forgot-password"}>
            Forgot password?
          </Anchor>
        </Group>
        <Flex mt="xl" gap="sm">
          <Button w="100%" color="lime" variant="light" type="submit">
            Login
          </Button>

        </Flex>
      </form>
    </AuthCard>
  );
}

export default LoginForm;
