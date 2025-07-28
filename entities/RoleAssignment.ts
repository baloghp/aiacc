import { Role } from '@/entities/enums';

export interface RoleAssignment {
  roles: Role[];
  primaryRole?: Role;
} 