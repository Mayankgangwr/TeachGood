import { type FC, useEffect, useState } from "react";
import {
  getSortIcon,
  handleSortTable,
  handleSort,
  handleFilter,
  handleClearFilter,
  handleItemSearch,
  getNumberOfPage,
} from "./Utils";
import {
  ISort,
  type FilterOperationsEnum,
  type IAppliedFilter,
  type IPagination,
  type ISortState,
  type ITableHeader,
  type ITableItemSearchState,
  type ITableProps,
  type ITableRow,
} from "./Interface";
import { FiterPopover, TableItemSearch } from "./Components";
import Pagination from "./Components/Pagination";

const Table: FC<ITableProps> = ({
  tableHeader: initialTableHeader,
  tableRows: initialTableRows,
  initialSort,
  rowsPerPage,
}) => {
  const [tableHeader, setTableHeader] = useState<ITableHeader[]>([]);
  const [tableRows, setTableRows] = useState<ITableRow[]>(initialTableRows);
  const [isSort, setIsSort] = useState<ISortState>({ key: null, sortBy: null });
  const [searchItemBy, setSearchItemBy] = useState<ITableItemSearchState[] | undefined>(undefined);
  const [searchVal, setSearchVal] = useState<string>("");
  const [appliedFilterMap, setAppliedFilterMap] = useState<Map<string, IAppliedFilter>>(new Map());
  const [pagination, setPagination] = useState<IPagination>({
    currPage: 1,
    total: 1,
    rowsPerPage: initialTableRows.length,
    paginationOptions: [10],
  });
  const [offSets, setOffSets] = useState<ITableRow[]>([]);

  useEffect(() => {
    if (initialTableHeader) {
      const searchBy = initialTableHeader
        .filter((el) => el.isSearch === true)
        .map((el) => ({ key: el.key, dataType: el.dataType || "string" }));
      if (searchBy.length > 0) setSearchItemBy(searchBy);
      setTableHeader(initialTableHeader);
    }

    if (initialTableRows) {
      setTableRows(initialTableRows);
      if (rowsPerPage) {
        const totalPages = getNumberOfPage(initialTableRows.length, rowsPerPage[0]);
        setPagination((prev) => ({
          ...prev,
          currPage: 1,
          total: totalPages,
          rowsPerPage: rowsPerPage[0],
          paginationOptions: rowsPerPage,
        }));
      }
    }

    if (initialSort) {
      setIsSort(initialSort);
      const sortedTableRows = handleSortTable(initialSort, initialTableRows);
      sortedTableRows && setTableRows(sortedTableRows);
    }
  }, [initialTableHeader, initialTableRows, initialSort, rowsPerPage]);

  useEffect(() => {
    if (isSort && isSort.key) {
      const sortedTableRows = handleSortTable(
        { key: isSort.key, sortBy: isSort.sortBy || ISort.ASC },
        tableRows
      );
      if (sortedTableRows) {
        setTableRows(sortedTableRows);
        const offset = handlePaginate(sortedTableRows, pagination);
        setOffSets(() => offset);
      }
    }
  }, [pagination]);

  const handleSortfn = async (key: string) => {
    if (!tableRows) return;
    const result = await handleSort(key, isSort, tableRows);
    setIsSort(result.isSort);
    if (result.tableRows) {
      const offset = handlePaginate(result.tableRows, pagination);
      setOffSets(() => offset);
    }
  };

  const handleFilterfn = async (
    column: string,
    value: string,
    operation: FilterOperationsEnum,
    dataType: "string" | "number" | "date"
  ) => {
    let updatedRows = tableRows;
    let updatedFilterMap = new Map(appliedFilterMap);

    if (appliedFilterMap.has(column)) {
      const { appliedFilter, filteredRows } = handleClearFilter(column, appliedFilterMap, initialTableRows);
      updatedFilterMap = appliedFilter;
      updatedRows = filteredRows;
    }
    const filteredRows = handleFilter(updatedRows, column, value, operation, dataType);
    updatedFilterMap.set(column, { column, value, operation, dataType });
    setAppliedFilterMap(updatedFilterMap);

    if (isSort.key && isSort.sortBy) {
      const sortedTableRows = handleSortTable({ key: isSort.key, sortBy: isSort.sortBy }, filteredRows);
      if (sortedTableRows) {
        setTableRows(sortedTableRows);
        handlePaginationAfterAnyAction(sortedTableRows);
      }
    }
  };

  const handleClearFilterfn = (column: string) => {
    const result = handleClearFilter(column, appliedFilterMap, initialTableRows);
    setAppliedFilterMap(result.appliedFilter);
    let filteredRows = result.filteredRows;
    if (searchVal !== "" && searchItemBy) {
      filteredRows = handleItemSearch(searchVal, result.filteredRows, searchItemBy);
    }
    setTableRows(filteredRows);
    handlePaginationAfterAnyAction(filteredRows);
  };

  const handleItemSearchfn = (searchVal: string) => {
    if (searchVal === "") {
      let filteredRows = initialTableRows;
      const newMap = new Map(appliedFilterMap);
      if (newMap.size > 0) {
        newMap.forEach(({ column, value, operation, dataType }) => {
          filteredRows = handleFilter(filteredRows, column, value, operation, dataType);
        });
      }
      handlePaginationAfterAnyAction(filteredRows);
    } else if (searchItemBy) {
      const searchedRows = handleItemSearch(searchVal, tableRows, searchItemBy);
      handlePaginationAfterAnyAction(searchedRows);
    }
  };

  const handlePaginationAfterAnyAction = (filteredRows: ITableRow[]) => {
    if (isSort && isSort.key) {
      const sortedTableRows = handleSortTable(
        { key: isSort.key, sortBy: isSort.sortBy || ISort.ASC },
        filteredRows
      );
      if (sortedTableRows) {
        setTableRows(sortedTableRows);
        const totalPages = getNumberOfPage(filteredRows.length, pagination.rowsPerPage);
        setPagination((prevState) => ({ ...prevState, total: totalPages }));
        const offset = handlePaginate(sortedTableRows, { ...pagination, total: totalPages });
        setOffSets(offset);
      }
    }
  };

  const handlePaginate = (tableRows: ITableRow[], pagination: IPagination) => {
    const startIndex = (pagination.currPage - 1) * pagination.rowsPerPage;
    return tableRows.slice(startIndex, startIndex + pagination.rowsPerPage);
  };

  const handleNumberOfRows = (rowsPerPage: number) => {
    const totalPages = getNumberOfPage(tableRows.length, rowsPerPage);
    setPagination((prev) => ({ ...prev, total: totalPages, rowsPerPage }));
  };

  const handlePagination = (pageNumber: number) => {
    setPagination((prev) => ({ ...prev, currPage: pageNumber }));
  };

  return (
    <div className="overflow-x-auto">
      <TableItemSearch
        tableRows={tableRows}
        searchBy={searchItemBy}
        handleItemSearch={(val) => {
          setSearchVal(val);
          handleItemSearchfn(val);
        }}
      />

      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            {tableHeader.map((th) => (
              <th
                key={th.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => th.isSort !== false && handleSortfn(th.key)}
              >
                <div className="flex items-center justify-between">
                  <span>{th.title}</span>
                  {th.isSort !== false && getSortIcon(th.key, isSort)}
                  {th.isFilter !== false && (
                    <FiterPopover
                      key={th.key}
                      column={th.key}
                      dataType={th.dataType || "string"}
                      options={th.options}
                      handleFilter={handleFilterfn}
                      handleClearFilter={handleClearFilterfn}
                      appliedFilter={appliedFilterMap.get(th.key)}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {offSets.map((row, idx) => (
            <tr key={idx}>
              {Object.keys(row).map((key) => (
                <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {row[key].value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        pagination={pagination}
        handleNumberOfRows={handleNumberOfRows}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default Table;
