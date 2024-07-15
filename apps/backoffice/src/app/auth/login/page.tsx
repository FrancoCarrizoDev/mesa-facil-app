"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@repo/ui/button";
import Input from "@repo/ui/input";
import Link from "@/components/Link/link";
import useForm from "@/hooks/use-form";
import Image from "next/image";
import styles from "./styles.module.css";

export default function Page(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      term: "",
      password: "",
    },
    onSubmit: async (formValues) => {
      const res = await signIn("credentials", {
        term: formValues.term,
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
    <div className="h-screen grid grid-cols-2">
      <div className="flex flex-col px-20 pb-12 justify-center bg-white shadow-md">
        <div className=" mb-6">
          <h1 className="text-2xl font-bold">Ingresar</h1>
        </div>
        <form className="flex flex-col " onSubmit={handleSubmit}>
          <div className="mb-6">
            <Input
              label="Nombre de usuario o email"
              onChange={(e) => {
                handleChange({
                  term: e.target.value,
                });
              }}
              type="text"
              value={values.term}
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
          <p className="mb-1 text-sm">
            ¿No tienes cuenta? <Link href="/auth/register">Regístrate</Link>
          </p>
          <p className="mb-6 text-sm">
            ¿Olvidaste tu contraseña?{" "}
            <Link href="/auth/register">Haz clic aqui</Link>
          </p>
          {error && <div className="text-red-500 text-sm mb-6 ">{error}</div>}
          <div className="flex flex-col gap-3">
            <Button type="submit" size="md">
              Ingresar
            </Button>
          </div>
        </form>
      </div>
      <div className={styles["image-container"]}>
        <Image fill src="/mesa_facil.jpg" alt="logo" />
      </div>
    </div>
  );
}
