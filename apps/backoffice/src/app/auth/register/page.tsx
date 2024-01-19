"use client";
import { createUser } from "src/actions/user.actions";
import { useForm } from "@hooks";
import Button from "@repo/ui/button";
import Checkbox from "@repo/ui/checkbox";
import Input from "@repo/ui/input";

export default function Page(): JSX.Element {
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
      const newUser = await createUser({
        email: formValues.email,
        firstName: formValues.name,
        lastName: formValues.lastName,
        password: formValues.password,
      });
      console.log({ newUser });
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
      </form>
    </div>
  );
}