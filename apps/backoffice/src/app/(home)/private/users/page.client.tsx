"use client";
import Link from "@/components/Link/link";
import { UserDTO } from "@/models/user.model";
import Button from "@repo/ui/button";
import DataTable, { TableColumn, TableData } from "@repo/ui/data-table";

import React from "react";

export default function UsersClientPage({ userList }: { userList: UserDTO[] }) {
  const columns: TableColumn[] = [
    { key: "firstName", header: "Nombre" },
    { key: "lastName", header: "Apellido" },
    { key: "email", header: "Email" },
    { key: "userRole", header: "Rol" },
    { key: "createdAt", header: "Fecha Creación" },
    { key: "updatedAt", header: "Fecha Actualización" },
    { key: "restaurants", header: "Restaurantes" },
    { key: "action", header: "Action" },
  ];

  const data: TableData[] = userList.map((user) => ({
    ...user,
    lastName: user.lastName || "",
    userRole: user.userRole,
    createdAt: new Date(user.createdAt).toLocaleString("es-ES"),
    updatedAt: new Date(user.updatedAt).toLocaleString("es-ES"),
    restaurants: user.restaurants
      .map((restaurant) => restaurant.name)
      .join(", "),
    action: (
      <div className="flex items-center">
        <Link underline="hover" href={`/private/users/${user.id}`}>
          Editar
        </Link>
        <Button variant="text" color="danger" onClick={() => {}}>
          Bloquear
        </Button>
      </div>
    ),
  }));

  return (
    <div className="w-full mb-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
