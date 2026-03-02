import React, { useState } from 'react';
import { Typography, Box, Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Layout } from '../components/layout/Layout';
import { EmployeeTable } from '../components/employees/EmployeeTable';
import { AddEmployeeDialog } from '../components/employees/AddEmployeeDialog';
import { EditEmployeeDialog } from '../components/employees/EditEmployeeDialog';
import type { Employee } from '../types';

// Dane startowe
const initialRows: Employee[] = [
  { id: 1, firstName: 'Jan', lastName: 'Kowalski', position: 'Senior Frontend Dev', status: 'Active' },
  { id: 2, firstName: 'Anna', lastName: 'Nowak', position: 'UX Designer', status: 'On Leave' },
  { id: 3, firstName: 'Piotr', lastName: 'Zieliński', position: 'Project Manager', status: 'Active' },
  { id: 4, firstName: 'Maria', lastName: 'Wiśniewska', position: 'QA Engineer', status: 'Terminated' },
  { id: 5, firstName: 'Kacper', lastName: 'Andrzej', position: 'Ola', status: 'Active' },
];

export const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialRows);
  
  // Stan dla modala dodawania
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Stan dla modala edycji
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  // --- CRUD OPERACJE ---

  // 1. Dodawanie
  const handleAddEmployee = (newEmployee: Omit<Employee, 'id'>) => {
    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    setEmployees([...employees, { id: newId, ...newEmployee }]);
  };

  // 2. Usuwanie
  const handleDeleteEmployee = (id: number) => {
    if (window.confirm('Czy na pewno chcesz usunąć tego pracownika?')) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  // 3. Otwieranie edycji
  const openEditDialog = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setIsEditDialogOpen(true);
  };

  // 4. Zapisywanie edycji
  const handleEditEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
  };

  return (
    <Layout currentPage="employees">
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <div>
            <Typography variant="h4" component="h1" fontWeight="bold" color="primary.dark">
              Pracownicy
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Zarządzaj listą zatrudnionych osób
            </Typography>
          </div>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={() => setIsAddDialogOpen(true)}
            size="large"
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Dodaj pracownika
          </Button>
        </Box>

        {/* Tabela teraz przyjmuje funkcje onEdit i onDelete */}
        <EmployeeTable 
          rows={employees} 
          onDelete={handleDeleteEmployee} 
          onEdit={openEditDialog} 
        />

        {/* Modal Dodawania */}
        <AddEmployeeDialog 
          open={isAddDialogOpen} 
          onClose={() => setIsAddDialogOpen(false)} 
          onAdd={handleAddEmployee} 
        />

        {/* Modal Edycji */}
        <EditEmployeeDialog 
          open={isEditDialogOpen} 
          onClose={() => setIsEditDialogOpen(false)} 
          onEdit={handleEditEmployee}
          employeeToEdit={employeeToEdit}
        />
      </Container>
    </Layout>
  );
};
