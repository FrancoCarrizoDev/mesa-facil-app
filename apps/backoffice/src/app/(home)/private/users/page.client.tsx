"use client";
import Link from "@/components/Link/link";
import { ROLES } from "@/constants/roles";
import { USER_STATUS, UserDTO } from "@/models/user.model";
import Button from "@repo/ui/button";
import DataTable, { TableColumn, TableData } from "@repo/ui/data-table";
import { Tooltip } from "react-tooltip";

import React from "react";

export default function UsersClientPage({
  userList,
  userLoggedRole,
}: {
  userList: UserDTO[];
  userLoggedRole: string;
}) {
  const columns: TableColumn[] = [
    { key: "firstName", header: "Nombre" },
    { key: "lastName", header: "Apellido" },
    { key: "email", header: "Email" },
    { key: "userRole", header: "Rol" },
    { key: "status", header: "Estado de acceso" },
    { key: "createdAt", header: "Fecha Creación" },
    { key: "updatedAt", header: "Fecha Actualización" },
    { key: "restaurants", header: "Restaurantes" },
    { key: "action", header: "Action" },
  ];

  const hasEditUserPermission = (userLoggedRole: string, userRole: string) => {
    if (userLoggedRole === ROLES.ADMIN.ID) {
      return true;
    }

    if (userLoggedRole === ROLES.MANAGER.ID && userRole === ROLES.USER.ID) {
      return true;
    }

    return false;
  };

  const data: TableData[] = userList.map((user) => {
    const cantEditUser = !hasEditUserPermission(userLoggedRole, user.userRole);

    return {
      ...user,
      lastName: user.lastName || "",
      userRole: user.userRole,
      createdAt: new Date(user.createdAt).toLocaleString("es-ES"),
      updatedAt: new Date(user.updatedAt).toLocaleString("es-ES"),
      status: (
        <p
          className={`font-medium ${
            user.status === USER_STATUS.ACTIVE
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {user.status}
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
              href={`/private/users/${user.id}`}
            >
              Editar
            </Link>
            {cantEditUser && <p id="my-anchor-element">❔</p>}
          </div>
          {user.userRole !== ROLES.ADMIN.ID && (
            <Button variant="text" color="danger" onClick={() => {}}>
              Bloquear
            </Button>
          )}
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
