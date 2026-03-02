import React from 'react';
import { Chip, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';   // Ikona edycji
import DeleteIcon from '@mui/icons-material/DeleteOutlined'; // Ikona usuwania
import type { Employee, EmployeeStatus } from '../../types';
import { DataGrid, GridActionsCellItem, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';

interface EmployeeTableProps {
  rows: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const getStatusColor = (status: EmployeeStatus) => {
  switch (status) {
    case 'Active': return 'success';
    case 'On Leave': return 'warning';
    case 'Terminated': return 'error';
    default: return 'default';
  }
};

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ rows, onEdit, onDelete }) => {
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Imię', width: 150 },
    { field: 'lastName', headerName: 'Nazwisko', width: 150 },
    { field: 'position', headerName: 'Stanowisko', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Chip 
          label={params.value} 
          color={getStatusColor(params.value as EmployeeStatus)} 
          variant="outlined" 
          size="small" 
        />
      ),
    },
    // --- NOWA KOLUMNA AKCJI ---
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Akcje',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edytuj"
            className="textPrimary"
            onClick={() => onEdit(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Usuń"
            onClick={() => onDelete(row.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Paper sx={{ height: 400, width: '100%', mt: 2, boxShadow: 3 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
};