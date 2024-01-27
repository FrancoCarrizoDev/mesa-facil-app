export interface TableColumn {
  key: string;
  header: string;
}

export interface TableData {
  [key: string]: string | number | JSX.Element;
}

interface DataTableProps {
  columns: TableColumn[];
  data: TableData[];
}

export default function DataTable({ columns, data }: DataTableProps) {
  return (
    <div className="w-full ui-bg-white ui-pb-3 ui-shadow-md ui-sm:rounded-lg ">
      <div className=" ui-w-full ui-relative ui-overflow-x-auto  ">
        <table className="ui-w-full ui-text-sm ui-text-left rtl:ui-text-right ui-text-gray-500 ">
          <thead className="ui-text-xs ui-text-gray-700 ui-uppercase ui-bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="ui-px-6 ui-py-3">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="ui-bg-white ui-border-b hover:ui-bg-gray-50"
              >
                {columns.map((column) => (
                  <td key={column.key} className="ui-px-6 ui-py-4">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav
        className="ui-flex ui-items-center ui-flex-column ui-flex-wrap md:ui-flex-row ui-justify-between ui-pt-4 ui-px-3"
        aria-label="Table navigation"
      >
        <span className="ui-text-sm ui-font-normal ui-text-gray-500  ui-mb-4 md:ui-mb-0 ui-block ui-w-full md:ui-inline md:ui-w-auto">
          Showing{" "}
          <span className="ui-font-semibold ui-text-gray-900">1-10</span> of{" "}
          <span className="ui-font-semibold ui-text-gray-900">1000</span>
        </span>
        <ul className="ui-inline-flex ui--space-x-px rtl:ui-space-x-reverse ui-text-sm ui-h-8">
          <li>
            <a
              href="#"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 ui-ms-0 ui-leading-tight ui-text-gray-500 ui-bg-white border ui-border-gray-300 ui-rounded-s-lg hover:ui-bg-gray-100 hover:ui-text-gray-700"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 ui-leading-tight ui-text-gray-500 ui-bg-white border ui-border-gray-300 hover:ui-bg-gray-100 hover:ui-text-gray-700"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 ui-leading-tight ui-text-gray-500 ui-bg-white border ui-border-gray-300 hover:ui-bg-gray-100 hover:ui-text-gray-700"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 text-blue-600 ui-border ui-border-gray-300 ui-bg-blue-50 hover:ui-bg-gray-100 hover:ui-text-gray-700"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 ui-leading-tight ui-text-gray-500 ui-bg-white border ui-border-gray-300 hover:ui-bg-gray-100 hover:ui-text-gray-700"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 ui-leading-tight ui-text-gray-500 ui-bg-white border ui-border-gray-300 hover:ui-bg-gray-100 hover:ui-text-gray-700"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 ui-leading-tight ui-text-gray-500 ui-bg-white border ui-border-gray-300 rounded-e-lg hover:ui-bg-gray-100 hover:ui-text-gray-700"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
