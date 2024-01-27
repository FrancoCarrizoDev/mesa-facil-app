import { getUserList } from "@/actions/user.actions";
import Link from "@/components/Link/link";
import { ROLES } from "@/constants/roles";
import getSession from "@/utils/get-session";
import { hasManageUsersPermission } from "@/utils/permissions";
import DataTable, { TableColumn, TableData } from "@repo/ui/data-table";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";

export default async function UsersPage() {
  const session = await getSession();

  const hasPermission = hasManageUsersPermission(session?.user?.role || "USER");
  if (!hasPermission) {
    return <div>Ups, no tienes permisos para ver esta página...</div>;
  }

  const userList = await getUserList();
  console.log({ userList });
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
    createdAt: new Date(user.createdAt).toLocaleString(),
    updatedAt: new Date(user.updatedAt).toLocaleString(),
    restaurants: user.restaurants
      .map((restaurant) => restaurant.name)
      .join(", "),
    action: (
      <Link underline="hover" href={`/private/users/${user.id}`}>
        Editar
      </Link>
    ),
  }));

  return (
    <Section>
      <div className="flex justify-between items-center">
        <SectionTitle>Usuarios</SectionTitle>
        <Link underline="hover" href="/private/users/create">
          Nuevo Usuario
        </Link>
      </div>
      <SectionBody>
        <DataTable columns={columns} data={data} />
      </SectionBody>
    </Section>
  );
}
