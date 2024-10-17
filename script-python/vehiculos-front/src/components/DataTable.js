import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

function DataTable({ data }) {
  const [pageIndex, setPageIndex] = useState(0); // Página actual
  const [pageSize, setPageSize] = useState(5);   // Tamaño de la página

  // Definir las columnas de la tabla
  const columns = useMemo(
    () => [
      {
        accessorKey: 'make',
        header: 'Marca',
      },
      {
        accessorKey: 'model',
        header: 'Modelo',
      },
      {
        accessorKey: 'year',
        header: 'Año',
      },
      {
        accessorKey: 'comb08',
        header: 'Eficiencia Comb. Mixta',
      },
      {
        accessorKey: 'city08',
        header: 'Eficiencia Comb. Ciudad',
      },
      {
        accessorKey: 'highway08',
        header: 'Eficiencia Comb. Pista',
      },
    ],
    []
  );

  // Crear la paginación dividiendo los datos según el índice de página y el tamaño de página
  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, pageIndex, pageSize]);

  // Crear filas llenas y vacías para mantener un tamaño de tabla consistente
  const rowsWithPadding = useMemo(() => {
    const paddedRows = [...paginatedData];
    while (paddedRows.length < pageSize) {
      paddedRows.push({ id: `empty-${paddedRows.length}` }); // Añadir filas vacías con IDs únicos
    }
    return paddedRows;
  }, [paginatedData, pageSize]);

  // Configurar la tabla usando los datos paginados
  const table = useReactTable({
    data: rowsWithPadding,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto w-full max-w-6xl mx-auto">
      <table className="min-w-full bg-white border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-purple-600 text-white">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-3 px-4 border-b border-gray-200 text-left"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              style={{ height: '3rem' }} // Fijar altura de cada fila
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-3 px-4 border-b border-gray-200">
                  {cell.getValue() ? (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  ) : (
                    <span className="invisible">-</span> // Rellenar para mantener la altura
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de paginación */}
      <div className="flex justify-between items-center mt-4 w-full max-w-6xl mx-auto">
        <div className="flex items-center space-x-2">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
            disabled={pageIndex === 0}
          >
            Anterior
          </button>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            onClick={() => setPageIndex((old) => (old + 1) < Math.ceil(data.length / pageSize) ? old + 1 : old)}
            disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}
          >
            Siguiente
          </button>
        </div>
        <span className="text-sm">
          Página {pageIndex + 1} de {Math.ceil(data.length / pageSize)}
        </span>
      </div>
    </div>
  );
}

export default DataTable;
