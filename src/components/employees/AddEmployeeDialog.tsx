import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Box
} from '@mui/material';
import type { Employee, EmployeeStatus } from '../../types';

interface AddEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (employee: Omit<Employee, 'id'>) => void;
}

const statuses: EmployeeStatus[] = ['Active', 'On Leave', 'Terminated'];

export const AddEmployeeDialog: React.FC<AddEmployeeDialogProps> = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    status: 'Active' as EmployeeStatus,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.firstName && formData.lastName && formData.position) {
      onAdd(formData);
      setFormData({ firstName: '', lastName: '', position: '', status: 'Active' }); // Reset
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Dodaj Nowego Pracownika</DialogTitle>
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
        <Button onClick={handleSubmit} variant="contained" color="primary">Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
};