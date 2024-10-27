"use client";
import { signUp } from "@/actions/signup/signup";
import { Loginschema, UserSchema } from "@/schema/schema";
import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export default function Signup() {
  //

  const [loading, setLoading] = useState(false);
  const [noError, setNoError] = useState(true);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: zodResolver(Loginschema),
  });

  const submitLogin = async (values: z.infer<typeof UserSchema>) => {
    setLoading(true);
    const res = await signUp(values);
    if (res?.isError) {
      setLoading(true);
      const login = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (login?.ok) {
        return router.push("/usecases");
      } else {
        setLoading(false);
        setNoError(false);
      }
    } else {
      setLoading(false);
      setNoError(false);
    }
  };
  return (
    <>
      <Alert variant="light" color="red" title="Erreur" mt={16} hidden={noError}>
        Error in signup!
      </Alert>

      <form onSubmit={form.onSubmit((values) => submitLogin(values))} className="mt-6 space-y-4">
        <div>
          <TextInput label="Name" withAsterisk placeholder="Name" {...form.getInputProps("name")} />
        </div>
        <div>
          <TextInput label="Adresse mail" withAsterisk placeholder="Adresse mail" {...form.getInputProps("email")} />
        </div>
        <div>
          <PasswordInput label="Mot de passe" withAsterisk placeholder="Mot de passe" {...form.getInputProps("password")} />
        </div>
        <div>
          <Button type="submit" loading={loading} loaderProps={{ type: "dots" }} color={"blue"} fullWidth>
            Singup
          </Button>
        </div>
      </form>
    </>
  );
}
