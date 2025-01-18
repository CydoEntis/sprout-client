import { Button, PasswordInput, TextInput } from "@mantine/core";
import { AtSign, Lock, User2 } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import AuthCard from "./components/AuthCard";
import { LoginRequest } from "./shared/auth.types";
import { loginSchema } from "./shared/auth.schemas";

function RegisterForm() {
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
          label="Confirm Password"
          placeholder="Confirm your password"
          mt="md"
          classNames={{
            input: "input",
          }}
          leftSection={<Lock size={20} />}
          {...form.getInputProps("confirmPassword")}
          onChange={(event) => {
            form.setFieldValue("confirmPassword", event.currentTarget.value);
          }}
        />

        <Button fullWidth mt="xl" color="violet" variant="light" type="submit">
          Sign up
        </Button>
      </form>
    </AuthCard>
  );
}

export default RegisterForm;
