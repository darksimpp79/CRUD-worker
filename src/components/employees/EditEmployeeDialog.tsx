import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Box
} from '@mui/material';
import type { Employee, EmployeeStatus } from '../../types';

interface EditEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
  employeeToEdit: Employee | null;
}

const statuses: EmployeeStatus[] = ['Active', 'On Leave', 'Terminated'];

export const EditEmployeeDialog: React.FC<EditEmployeeDialogProps> = ({ open, onClose, onEdit, employeeToEdit }) => {
  const [formData, setFormData] = useState<Employee>({
    id: 0,
    firstName: '',
    lastName: '',
    position: '',
    status: 'Active',
  });

  // Ten efekt wypełnia formularz danymi pracownika, kiedy otwieramy okno
  useEffect(() => {
    if (employeeToEdit) {
      setFormData(employeeToEdit);
    }
  }, [employeeToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.firstName && formData.lastName && formData.position) {
      onEdit(formData);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edytuj Pracownika</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 0.5 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField label="Imię" name="firstName" fullWidth value={formData.firstName} onChange={handleChange} />
            <TextField label="Nazwisko" name="lastName" fullWidth value={formData.lastName} onChange={handleChange} />
          </Box>
          <TextField label="Stanowisko" name="position" fullWidth value={formData.position} onChange={handleChange} />
          <TextField select label="Status" name="status" fullWidth value={formData.status} onChange={handleChange}>
            {statuses.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Anuluj</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Zapisz zmiany</Button>
      </DialogActions>
    </Dialog>
  );
};