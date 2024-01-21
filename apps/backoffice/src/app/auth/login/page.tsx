"use client";
import { useForm } from "@hooks";
import Button from "@repo/ui/button";
import Input from "@repo/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {
  const router = useRouter();
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (formValues) => {
      const res = await signIn("credentials", {
        email: formValues.email,
        password: formValues.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/private");
        router.refresh();
      }

      console.log(res);
    },
  });

  return (
    <div className="grid place-content-center">
      <div className="pt-10 mb-6">
        <h1 className="text-2xl font-bold text-center">Ingresar</h1>
      </div>
      <form className="flex flex-col " onSubmit={handleSubmit}>
        <div className="mb-6">
          <Input
            label="Email"
            onChange={(e) => {
              handleChange({
                email: e.target.value,
              });
            }}
            type="email"
            value={values.email}
          />
        </div>
        <div className="mb-6">
          <Input
            label="Contraseña"
            onChange={(e) => {
              handleChange({
                password: e.target.value,
              });
            }}
            type="password"
            value={values.password}
          />
        </div>
        <Button type="submit" size="sm">
          Ingresar
        </Button>
      </form>
    </div>
  );
}
