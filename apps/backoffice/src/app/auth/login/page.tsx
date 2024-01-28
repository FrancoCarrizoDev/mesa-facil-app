"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@repo/ui/button";
import Input from "@repo/ui/input";
import Link from "@/components/Link/link";
import useForm from "@/hooks/use-form";

export default function Page(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
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

      if (res?.error) {
        setError(res.error);
      }
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
        <div className="mb-2">
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
        <p className="mb-6 text-sm">
          ¿No tienes cuenta? <Link href="/auth/register">Regístrate</Link>
        </p>
        {error && <div className="text-red-500 text-sm mb-6 ">{error}</div>}
        <div className="flex flex-col gap-3">
          <Button type="submit" size="md">
            Ingresar
          </Button>
          <Button
            size="md"
            color="secondary"
            onClick={() =>
              signIn("google", {
                callbackUrl: process.env.NEXT_PUBLIC_BASE_URL + "/private",
              })
            }
          >
            Ingresar con google
          </Button>
        </div>
      </form>
    </div>
  );
}
