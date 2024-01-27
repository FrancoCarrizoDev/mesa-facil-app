"use client";

import { ROLES } from "@/constants/roles";
import useForm from "@/hooks/use-form";
import Button from "@repo/ui/button";
import Input from "@repo/ui/input";
import Select from "@repo/ui/select";

interface CreateUserFormValues {
  name: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
  role: string;
  restaurantIds: string[];
}

export default function UserForm() {
  const { values, handleChange, handleSubmit } = useForm<CreateUserFormValues>({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      role: ROLES.ADMIN.ID,
      restaurantIds: [],
    },
    onSubmit: async (formValues) => {
      console.log(formValues);
    },
  });

  return (
    <form className="w-full " onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 juistify-items-center gap-4">
        <div className="w-full">
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
        </div>
        <div className="w-full">
          <div className="mb-6">
            <Select
              label="Seleccione un rol"
              onChange={(e) => {
                handleChange({
                  role: e.target.value,
                });
              }}
              options={Object.values(ROLES).map(({ ID, DISPLAY_NAME }) => ({
                value: ID,
                label: DISPLAY_NAME,
              }))}
              value={values.role}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <Button type="submit">Cancelar</Button>
        <Button type="submit">Crear usuario</Button>
      </div>
    </form>
  );
}
