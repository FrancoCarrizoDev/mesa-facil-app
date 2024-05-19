"use client";

import { ROLES } from "@repo/common/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@repo/ui/button";
import Checkbox from "@repo/ui/checkbox";
import GridListContainer from "@repo/ui/grid-list-container";
import Input from "@repo/ui/input";
import Select from "@repo/ui/select";
import type { UserDTO } from "@repo/common/models";
import { createUser, editUser } from "@/actions/user.actions";
import useForm from "@/hooks/use-form";

interface CreateEdutUserFormValues {
  id?: string;
  username: string;
  email: string;
  password: string;
  password2: string;
  role: number;
  restaurantIds: string[];
}

interface UserFormProps {
  restaurantList: {
    id: string;
    name: string;
  }[];
  user?: UserDTO;
}

const getInitialValues = (user?: UserDTO): CreateEdutUserFormValues => {
  if (!user) {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
      role: ROLES.EMPLOYEE.ID,
      restaurantIds: [],
    };
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    password: "",
    password2: "",
    role: user.userRoleId,
    restaurantIds: user.restaurants.map(({ id }) => id),
  };
};

export default function UserForm({
  restaurantList,
  user,
}: UserFormProps): JSX.Element {
  const router = useRouter();
  const { values, handleChange, handleSubmit } =
    useForm<CreateEdutUserFormValues>({
      initialValues: getInitialValues(user),
      onSubmit: async (formValues) => {
        try {
          if (!user) {
            await createUser({
              email: formValues.email,
              firstName: formValues.username,
              password: formValues.password,
              role: formValues.role,
              restaurantIds: formValues.restaurantIds,
            });
          } else {
            await editUser({
              id: user.id,
              email: formValues.email,
              firstName: formValues.username,
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

  const selectOptions = Object.values(ROLES).map(({ ID, DISPLAY_NAME }) => ({
    value: ID,
    label: DISPLAY_NAME,
  }));

  return (
    <form className="w-full " onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 juistify-items-center gap-4">
        <div className="w-full">
          <div className="mb-6">
            <Input
              label="Usuario"
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
          {user ? (
            <div className="mb-6">
              <Checkbox
                checked={changePassword}
                id="passwordChange"
                onChange={(e) => {
                  setChangePassword(e.target.checked);
                }}
              >
                Cambiar contraseña
              </Checkbox>
            </div>
          ) : null}
        </div>
        <div className="w-full">
          <div className="mb-6">
            <Select
              label="Seleccione un rol"
              onChange={(e) => {
                handleChange({
                  role: +e.target.value,
                });
              }}
              options={selectOptions}
              value={values.role}
            />
          </div>
          <div className="mb-6 flex flex-col">
            <h6 className="ui-block ui-mb-2 ui-text-sm ui-font-medium ui-text-gray-900">
              Permisos para restaurantes
            </h6>
            <div className="mt-1">
              <GridListContainer>
                {restaurantList.map(({ id, name }) => (
                  <Checkbox
                    checked={values.restaurantIds.includes(id)}
                    id={id}
                    key={id}
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
              </GridListContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <Button
          onClick={() => {
            router.push("/private/users");
          }}
          type="button"
        >
          Cancelar
        </Button>
        <Button type="submit">{user ? "Editar" : "Crear"} usuario</Button>
      </div>
    </form>
  );
}
