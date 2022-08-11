declare type TTask = {
  id: number;
  task_name: string;
  deadline: string;
  status: string;
  employee_id: number;
  employee?: TEmployee;
}