"use client";

import { getRoleDisplayNameByRoleId } from "@repo/common/constants";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { USER_STATUS, type UserDTO } from "@repo/common/models";
import Button from "@repo/ui/button";
import DataTable, {
  type TableColumn,
  type TableData,
} from "@repo/ui/data-table";
import { canEditUser } from "@/utils/permissions";
import { editUserStatus } from "@/actions/user.actions";
import Link from "@/components/Link/link";

interface UsersClientPageProps {
  userList: UserDTO[];
  userLoggedRole: number;
}

export default function UsersClientPage({
  userList,
  userLoggedRole,
}: UsersClientPageProps): JSX.Element {
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
      userRootId: user.userRootId || "-",
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
      restaurants: (
        <p className="text-xs font-bold">
          {user.restaurants.map((restaurant) => restaurant.name).join(", ")}
        </p>
      ),
      action: (
        <div className="flex items-center">
          <div className="flex items-center gap-1 min-w-[60px]">
            <Link
              disabled={cantEditUser}
              href={`/private/users/${user.email}`}
              underline="hover"
              color={cantEditUser ? "disabled" : "primary"}
            >
              Editar
            </Link>
          </div>

          {user.active ? (
            <Button
              color={cantEditUser ? "disabled" : "danger"}
              disabled={cantEditUser}
              onClick={async () => {
                await editUserStatus({
                  id: user.id,
                  status: USER_STATUS.INACTIVE,
                });
                setTimeout(() => {
                  toast.success("Usuario bloqueado con éxito");
                }, 0);
              }}
              variant="text"
            >
              Bloquear
            </Button>
          ) : (
            <Button
              color={cantEditUser ? "disabled" : "tertiary"}
              disabled={cantEditUser}
              onClick={async () => {
                await editUserStatus({
                  id: user.id,
                  status: USER_STATUS.ACTIVE,
                });
                setTimeout(() => {
                  toast.success("Usuario desbloqueado con éxito");
                }, 0);
              }}
              variant="text"
            >
              Desbloquear
            </Button>
          )}
          {cantEditUser ? <p id="my-anchor-element">❔</p> : null}
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
