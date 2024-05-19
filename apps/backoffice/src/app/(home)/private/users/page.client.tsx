"use client";
import Link from "@/components/Link/link";
import { USER_STATUS, UserDTO } from "@repo/common/models";
import Button from "@repo/ui/button";
import DataTable, { TableColumn, TableData } from "@repo/ui/data-table";
import { Tooltip } from "react-tooltip";

import React from "react";
import { editUserStatus } from "@/actions/user.actions";
import { toast } from "react-toastify";
import { canEditUser } from "@/utils/permissions";
import { getRoleDisplayNameByRoleId } from "@repo/common/constants";

export default function UsersClientPage({
  userList,
  userLoggedRole,
}: {
  userList: UserDTO[];
  userLoggedRole: number;
}) {
  const columns: TableColumn[] = [
    { key: "username", header: "Usuario" },
    { key: "email", header: "Email" },
    { key: "userRoleId", header: "Rol" },
    { key: "active", header: "Estado de acceso" },
    { key: "createdAt", header: "Fecha Creación" },
    { key: "updatedAt", header: "Fecha Actualización" },
    { key: "restaurants", header: "Restaurantes" },
    { key: "lastLogin", header: "Último acceso" },
    { key: "action", header: "Action" },
  ];

  const data: TableData[] = userList.map((user) => {
    const cantEditUser = !canEditUser(userLoggedRole, user.userRoleId);

    return {
      ...user,
      userRoleId: getRoleDisplayNameByRoleId(user.userRoleId),
      createdAt: new Date(user.createdAt).toLocaleString("es-ES"),
      updatedAt: new Date(user.updatedAt).toLocaleString("es-ES"),
      lastLogin: user.lastLogin
        ? new Date(user.lastLogin).toLocaleString("es-ES")
        : "-",
      active: (
        <p
          className={`font-medium ${
            user.active ? "text-green-600" : "text-red-600"
          }`}
        >
          {user.active ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE}
        </p>
      ),
      restaurants: user.restaurants
        .map((restaurant) => restaurant.name)
        .join(", "),
      action: (
        <div className="flex items-center">
          <div className="flex items-center gap-1 min-w-[60px]">
            <Link
              disabled={cantEditUser}
              underline="hover"
              href={`/private/users/${user.email}`}
            >
              Editar
            </Link>
          </div>

          {user.active ? (
            <Button
              variant="text"
              color={cantEditUser ? "disabled" : "danger"}
              onClick={async () => {
                await editUserStatus({
                  id: user.id,
                  status: USER_STATUS.INACTIVE,
                });
                setTimeout(() => {
                  toast.success("Usuario bloqueado con éxito");
                }, 0);
              }}
              disabled={cantEditUser}
            >
              Bloquear
            </Button>
          ) : (
            <Button
              variant="text"
              color={cantEditUser ? "disabled" : "tertiary"}
              onClick={async () => {
                await editUserStatus({
                  id: user.id,
                  status: USER_STATUS.ACTIVE,
                });
                setTimeout(() => {
                  toast.success("Usuario desbloqueado con éxito");
                }, 0);
              }}
              disabled={cantEditUser}
            >
              Desbloquear
            </Button>
          )}
          {cantEditUser && <p id="my-anchor-element">❔</p>}
        </div>
      ),
    };
  });

  return (
    <div className="w-full mb-6">
      <DataTable columns={columns} data={data} />
      <Tooltip
        anchorSelect="#my-anchor-element"
        content="No tienes permisos para esta acción"
      />
    </div>
  );
}
