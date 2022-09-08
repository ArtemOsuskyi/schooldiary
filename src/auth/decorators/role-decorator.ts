import { Roles } from '../../db/enums/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const ApprovedRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
