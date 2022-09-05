import React, { useMemo, useRef, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
// import style from "./Table.module.scss";

export default function Table() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'date',
        header: 'DATE',
        size: 86,
      },
      {
        accessorKey: 'description',
        header: 'DESCRIPTION',
        size: 220,
      },
      {
        accessorKey: 'categories',
        header: 'CATAGORY',
        size: 116,
      },
      {
        accessorKey: 'value',
        header: 'SUM',
        size: 116,
        // muiTableHeadCellProps: { sx: { color: 'red' } },
      },
    ],
    []
  );

  const data = useMemo(
    // ниже должен быть массив со списком тринзакций
    () => [
      {
        day: '29',
        month: '08',
        year: '2022',
        description: 'Meat',
        categories: 'Product',
        value: 400,
      },
      {
        day: '12',
        month: '08',
        year: '2022',
        description: 'Milk',
        categories: 'Product',
        value: 100,
      },
      {
        day: '12',
        month: '08',
        year: '2022',
        description: 'Milk',
        categories: 'Product',
        value: 100,
      },
      {
        day: '12',
        month: '08',
        year: '2022',
        description: 'Milk',
        categories: 'Product',
        value: 100,
      },
      {
        day: '12',
        month: '08',
        year: '2022',
        description: 'Milk',
        categories: 'Product',
        value: 100,
      },
      {
        day: '12',
        month: '08',
        year: '2022',
        description: 'Milk',
        categories: 'Product',
        value: 100,
      },
      {
        day: '12',
        month: '08',
        year: '2022',
        description: 'Milk',
        categories: 'Product',
        value: 100,
      },
      {
        day: '12',
        month: '08',
        year: '2022',
        description: 'Milk',
        categories: 'Product',
        value: 100,
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableBottomToolbar={false}
      enablePagination={false}
      enableColumnFilters={false}
      enableColumnActions={false}
      enableSorting={true}
      //   enableStickyHeader={true}
      enableTopToolbar={false}
      muiTableProps={{
        sx: {
          tableLayout: 'fixed',
        },
      }}
      muiTableContainerProps={{ sx: { maxHeight: '400px' } }}
    />
  );
}
