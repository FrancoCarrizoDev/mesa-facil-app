"use client";

import { ROLES } from "@/constants/roles";
import useForm from "@/hooks/use-form";
import Button from "@repo/ui/button";
import Checkbox from "@repo/ui/checkbox";
import Input from "@repo/ui/input";
import Select from "@repo/ui/select";
import { createUser, editUser } from "@/actions/user.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserDTO } from "@/models/user.model";
import { useState } from "react";

interface CreateEdutUserFormValues {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
  role: string;
  restaurantIds: string[];
}

const getInitialValues = (user?: UserDTO): CreateEdutUserFormValues => {
  if (!user) {
    return {
      name: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      role: ROLES.USER.ID,
      restaurantIds: [],
    };
  }

  return {
    id: user.id,
    name: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
    password2: "",
    role: user.userRole,
    restaurantIds: user.restaurants.map(({ id }) => id),
  };
};

export default function UserForm({
  restaurantList,
  user,
}: {
  restaurantList: {
    id: string;
    name: string;
  }[];
  user?: UserDTO;
}) {
  const router = useRouter();
  const { values, handleChange, handleSubmit } =
    useForm<CreateEdutUserFormValues>({
      initialValues: getInitialValues(user),
      onSubmit: async (formValues) => {
        try {
          if (!user) {
            await createUser({
              email: formValues.email,
              firstName: formValues.name,
              lastName: formValues.lastName,
              password: formValues.password,
              role: formValues.role,
              restaurantIds: formValues.restaurantIds,
            });
          } else {
            await editUser({
              id: user.id,
              email: formValues.email,
              firstName: formValues.name,
              lastName: formValues.lastName,
              password: formValues.password,
              role: formValues.role,
              restaurantIds: formValues.restaurantIds,
              changePassword: formValues.password !== "",
            });
          }
          toast.success("Usuario creado correctamente");
          router.push("/private/users");
        } catch (error) {
          toast.error("Error al crear el usuario");
          console.log(error);
        }
      },
    });
  const [changePassword, setChangePassword] = useState(false);

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
              disabled={!!user && !changePassword}
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
              autoComplete="new-password"
              disabled={!!user && !changePassword}
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
          {user && (
            <div className="mb-6">
              <Checkbox
                id="passwordChange"
                checked={changePassword}
                onChange={(e) => {
                  setChangePassword(e.target.checked);
                }}
              >
                Cambiar contraseña
              </Checkbox>
            </div>
          )}
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
          <div className="mb-6 flex flex-col">
            <h6 className="ui-block ui-mb-2 ui-text-sm ui-font-medium ui-text-gray-900 ">
              Permisos para restaurantes
            </h6>
            <div className="flex gap-3 py-1">
              {restaurantList.map(({ id, name }) => (
                <Checkbox
                  key={id}
                  id={id}
                  checked={values.restaurantIds.includes(id)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      handleChange({
                        restaurantIds: [...values.restaurantIds, id],
                      });
                    } else {
                      handleChange({
                        restaurantIds: values.restaurantIds.filter(
                          (restaurantId) => restaurantId !== id
                        ),
                      });
                    }
                  }}
                >
                  {name}
                </Checkbox>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <Button
          type="button"
          onClick={() => {
            router.push("/private/users");
          }}
        >
          Cancelar
        </Button>
        <Button type="submit">{user ? "Editar" : "Crear"} usuario</Button>
      </div>
    </form>
  );
}
