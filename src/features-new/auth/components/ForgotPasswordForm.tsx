import { Button, TextInput } from "@mantine/core";
import { AtSign } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { loginSchema } from "../shared/auth.schemas";
import { LoginRequest } from "../shared/auth.types";
import AuthCard from "./AuthCard";

function ForgotPasswordForm() {
  const form = useForm<LoginRequest>({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <AuthCard title="Forgot Your Password?" anchorLabel="Remembered your password?" anchorText="Login" to="/login">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          classNames={{
            input: "input",
          }}
          leftSection={<AtSign size={20} />}
          {...form.getInputProps("email")}
        />
        <Button
          fullWidth
          mt="xl"
          color="lime"
          variant="light"
          type="submit"
          //   loading={forgotPassword.isPending}
        >
          Forgot Password
        </Button>
      </form>
    </AuthCard>
  );
}

export default ForgotPasswordForm;
