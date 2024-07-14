"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@repo/ui/button";
import Checkbox from "@repo/ui/checkbox";
import Input from "@repo/ui/input";
import Section from "@repo/ui/section";
import SectionTitle from "@repo/ui/section-title";
import SectionBody from "@repo/ui/section-body";
import Image from "next/image";
import useForm from "@/hooks/use-form";
import { createRootUser } from "@/actions/user.actions";
import Link from "@/components/Link/link";

export default function Page(): JSX.Element {
  const router = useRouter();
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
      acceptTerms: false,
    },
    onSubmit: async (formValues) => {
      await createRootUser({
        email: formValues.email,
        username: formValues.username,
        password: formValues.password,
      });

      await signIn("credentials", {
        term: formValues.email,
        password: formValues.password,
        redirect: false,
      });
      router.push("/private/restaurants");
    },
  });

  return (
    <div className="grid place-content-center min-h-screen">
      <Section>
        <div className="text-center">
          <SectionTitle>Registrarse</SectionTitle>
        </div>
        <SectionBody>
          <div className="w-full flex flex-col items-center">
            <form className="flex flex-col " onSubmit={handleSubmit}>
              <div className="mb-6">
                <Input
                  label="Nombre"
                  onChange={(e) => {
                    handleChange({
                      username: e.target.value,
                    });
                  }}
                  type="text"
                  value={values.username}
                />
              </div>
              <div className="mb-6">
                <Input
                  autoComplete="new-password"
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
                  autoComplete="new-password"
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
              <div className="mb-6">
                <Input
                  label="Repita la contraseña"
                  onChange={(e) => {
                    handleChange({
                      password2: e.target.value,
                    });
                  }}
                  type="password"
                  value={values.password2}
                />
              </div>
              <div className="mb-6">
                <Checkbox
                  id="acceptTerms"
                  checked={values.acceptTerms}
                  onChange={(e) => {
                    handleChange({
                      acceptTerms: e.target.checked,
                    });
                  }}
                >
                  I agree with the{" "}
                  <a href="/TEST" className="text-blue-600 ">
                    terms and conditions
                  </a>
                  .
                </Checkbox>
              </div>
              <p className="mb-6 text-sm">
                ¿Ya tienes cuenta? <Link href="/auth/login">Ingresar</Link>
              </p>
              <div className=" mx-auto">
                <Button type="submit" size="sm">
                  Registrarse
                </Button>
              </div>
            </form>
          </div>
        </SectionBody>
      </Section>
    </div>
  );
}
