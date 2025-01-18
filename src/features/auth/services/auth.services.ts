//   async function onSubmit(credentials: LoginRequest) {
//     try {
//       await login.mutateAsync(credentials);

//       form.reset();
//       navigate({ to: redirectTo || "/dashboard" });
//     } catch (err) {
//       const error = err as ErrorResponse;
//       handleAuthFormErrors(error, form);
//     }
//   }

//   async function handleDemoLogin() {
//     const demoCredentials = {
//       email: "demo@demo.com",
//       password: "Demo123*",
//     };

//     try {
//       await login.mutateAsync(demoCredentials);
//       form.reset();
//       navigate({ to: redirectTo || "/dashboard" });
//     } catch (err) {
//       const error = err as ErrorResponse;
//       handleAuthFormErrors(error, form);
//     }
//   }
