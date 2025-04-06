import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { AtSign, Lock, User2 } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";

import { useNavigate, useSearch } from "@tanstack/react-router";
import { loginSchema } from "../../shared/auth.schemas";
import { LoginRequest } from "../../shared/auth.types";
import AuthCard from "../auth-card/AuthCard";

function RegisterForm() {
  const search = useSearch({ from: "/register" });
  const redirectUrl = search.redirect ?? "/categories";
  const navigate = useNavigate();

  const form = useForm<LoginRequest>({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    navigate({ to: redirectUrl });
  };

  return (
    <AuthCard title="Let's Get You Registered!" anchorLabel="Already have an account?" anchorText="Login" to="/login">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap={8}>
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
          <TextInput
            label="Username"
            placeholder="Questbounder"
            classNames={{
              input: "input",
            }}
            leftSection={<User2 size={20} />}
            {...form.getInputProps("username")}
            onChange={(event) => {
              form.setFieldValue("username", event.currentTarget.value);
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            classNames={{
              input: "input",
            }}
            leftSection={<Lock size={20} />}
            {...form.getInputProps("password")}
            onChange={(event) => {
              form.setFieldValue("password", event.currentTarget.value);
            }}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            classNames={{
              input: "input",
            }}
            leftSection={<Lock size={20} />}
            {...form.getInputProps("confirmPassword")}
            onChange={(event) => {
              form.setFieldValue("confirmPassword", event.currentTarget.value);
            }}
          />
        </Stack>

        <Button fullWidth mt="xl" color="lime" variant="light" type="submit">
          Sign up
        </Button>
      </form>
    </AuthCard>
  );
}

export default RegisterForm;
