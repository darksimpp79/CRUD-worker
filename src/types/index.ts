export type EmployeeStatus = 'Active' | 'On Leave' | 'Terminated';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  status: EmployeeStatus;
}