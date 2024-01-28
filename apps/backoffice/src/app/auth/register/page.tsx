"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@repo/ui/button";
import Checkbox from "@repo/ui/checkbox";
import Input from "@repo/ui/input";
import useForm from "@/hooks/use-form";
import { createRootUser } from "@/actions/user.actions";

export default function Page(): JSX.Element {
  const router = useRouter();
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      acceptTerms: false,
    },
    onSubmit: async (formValues) => {
      const newUser = await createRootUser({
        email: formValues.email,
        firstName: formValues.name,
        lastName: formValues.lastName,
        password: formValues.password,
      });

      if (newUser) {
        await signIn("credentials", {
          email: formValues.email,
          password: formValues.password,
          redirect: false,
        });
        router.push("/private");
      }
    },
  });

  return (
    <div className="grid place-content-center">
      <div className="pt-10 mb-6">
        <h1 className="text-2xl font-bold text-center">Registrarse</h1>
      </div>
      <form className="flex flex-col " onSubmit={handleSubmit}>
        <div className="mb-6">
          <Input
            label="Nombre"
            onChange={(e) => {
              handleChange({
                name: e.target.value,
              });
            }}
            type="text"
            value={values.name}
          />
        </div>
        <div className="mb-6">
          <Input
            label="Apellido"
            onChange={(e) => {
              handleChange({
                lastName: e.target.value,
              });
            }}
            type="text"
            value={values.lastName}
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
            <a href="#" className="text-blue-600 ">
              terms and conditions
            </a>
            .
          </Checkbox>
        </div>
        <div className=" mx-auto">
          <Button type="submit">Registrarse</Button>
        </div>
        <div className=" mx-auto mt-3">
          <Button
            onClick={() =>
              signIn("google", {
                callbackUrl: process.env.NEXT_PUBLIC_BASE_URL + "/register",
              })
            }
            color="secondary"
          >
            Registrarme con google
          </Button>
        </div>
      </form>
    </div>
  );
}
