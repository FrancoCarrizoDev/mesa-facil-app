export default function DataTable() {
  return (
    <div className="ui-w-full ui-relative ui-overflow-x-auto ui-shadow-md ui-sm:rounded-lg">
      <table className="ui-w-full ui-text-sm ui-text-left ui-rtl:text-right ui-text-gray-500 ">
        <thead className="ui-text-xs ui-text-gray-700 ui-uppercase ui-bg-gray-50 ">
          <tr>
            <th scope="col" className="ui-p-4">
              <div className="ui-flex ui-items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="ui-w-4 ui-h-4 ui-text-blue-600 ui-bg-gray-100 ui-border-gray-300 ui-rounded ui-focus:ring-blue-500 ui-focus:ring-2 "
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="ui-px-6 ui-py-3">
              Product name
            </th>
            <th scope="col" className="ui-px-6 ui-py-3">
              Color
            </th>
            <th scope="col" className="ui-px-6 ui-py-3">
              Category
            </th>
            <th scope="col" className="ui-px-6 ui-py-3">
              Price
            </th>
            <th scope="col" className="ui-px-6 ui-py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="ui-bg-white ui-border-b ui-hover:bg-gray-50">
            <td className="ui-w-4 ui-p-4">
              <div className="ui-flex ui-items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="ui-w-4 ui-h-4 ui-text-blue-600 ui-bg-gray-100 ui-border-gray-300 ui-rounded ui-focus:ring-blue-500 ui-focus:ring-2 "
                />
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="ui-px-6 ui-py-4 ui-font-medium ui-text-gray-900 ui-whitespace-nowrap"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="ui-px-6 ui-py-4">Silver</td>
            <td className="ui-px-6 ui-py-4">Laptop</td>
            <td className="ui-px-6 ui-py-4">$2999</td>
            <td className="ui-px-6 ui-py-4">
              <a
                href="#"
                className="ui-font-medium ui-text-blue-600 ui-hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="ui-bg-white ui-border-b ui-hover:bg-gray-50">
            <td className="ui-w-4 ui-p-4">
              <div className="ui-flex ui-items-center">
                <input
                  id="checkbox-table-search-2"
                  type="checkbox"
                  className="ui-w-4 ui-h-4 ui-text-blue-600 ui-bg-gray-100 ui-border-gray-300 ui-rounded ui-focus:ring-blue-500 ui-focus:ring-2"
                />
                <label htmlFor="checkbox-table-search-2" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="ui-px-6 ui-py-4 ui-font-medium ui-text-gray-900 ui-whitespace-nowrap"
            >
              Microsoft Surface Pro
            </th>
            <td className="ui-px-6 ui-py-4">White</td>
            <td className="ui-px-6 ui-py-4">Laptop PC</td>
            <td className="ui-px-6 ui-py-4">$1999</td>
            <td className="ui-px-6 ui-py-4">
              <a
                href="#"
                className="ui-font-medium ui-text-blue-600 ui-hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="ui-bg-white ui-border-b ui-hover:bg-gray-50">
            <td className="ui-w-4 ui-p-4">
              <div className="ui-flex ui-items-center">
                <input
                  id="checkbox-table-search-3"
                  type="checkbox"
                  className="ui-w-4 ui-h-4 ui-text-blue-600 ui-bg-gray-100 ui-border-gray-300 ui-rounded ui-focus:ring-blue-500 ui-focus:ring-2"
                />
                <label htmlFor="checkbox-table-search-3" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="ui-px-6 ui-py-4 ui-font-medium ui-text-gray-900 ui-whitespace-nowrap"
            >
              Magic Mouse 2
            </th>
            <td className="ui-px-6 ui-py-4">Black</td>
            <td className="ui-px-6 ui-py-4">Accessories</td>
            <td className="ui-px-6 ui-py-4">$99</td>
            <td className="ui-px-6 ui-py-4">
              <a
                href="#"
                className="ui-font-medium ui-text-blue-600 ui-hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <nav
        className="ui-flex ui-items-center ui-flex-column ui-flex-wrap ui-md:flex-row ui-justify-between ui-pt-4"
        aria-label="Table navigation"
      >
        <span className="ui-text-sm ui-font-normal ui-text-gray-500  ui-mb-4 ui-md:mb-0 ui-block ui-w-full ui-md:inline ui-md:w-auto">
          Showing{" "}
          <span className="ui-font-semibold ui-text-gray-900">1-10</span> of{" "}
          <span className="ui-font-semibold ui-text-gray-900">1000</span>
        </span>
        <ul className="ui-inline-flex ui--space-x-px ui-rtl:space-x-reverse ui-text-sm ui-h-8">
          <li>
            <a
              href="#"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 ui-ms-0 ui-leading-tight ui-text-gray-500 ui-bg-white border ui-border-gray-300 ui-rounded-s-lg ui-hover:bg-gray-100 ui-hover:text-gray-700"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 ui-leading-tight ui-text-gray-500 ui-bg-white border ui-border-gray-300 ui-hover:bg-gray-100 ui-hover:text-gray-700"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 ui-leading-tight ui-text-gray-500 ui-bg-white border ui-border-gray-300 ui-hover:bg-gray-100 ui-hover:text-gray-700"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 text-blue-600 ui-border ui-border-gray-300 ui-bg-blue-50 ui-hover:bg-blue-100 ui-hover:text-blue-700"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 ui-leading-tight ui-text-gray-500 ui-bg-white border ui-border-gray-300 ui-hover:bg-gray-100 ui-hover:text-gray-700"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 ui-leading-tight ui-text-gray-500 ui-bg-white border ui-border-gray-300 ui-hover:bg-gray-100 ui-hover:text-gray-700"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ui-flex ui-items-center ui-justify-center ui-px-3 ui-h-8 ui-leading-tight ui-text-gray-500 ui-bg-white border ui-border-gray-300 rounded-e-lg ui-hover:bg-gray-100 ui-hover:text-gray-700"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
