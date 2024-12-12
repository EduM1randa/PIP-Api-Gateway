import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../enums/roles.enum"; // Importa los roles definidos

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtener los roles permitidos para la ruta, usando la clave correcta 'roles'
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'role',
      [context.getHandler(), context.getClass()],
    );

    // Si no se especifican roles, permite el acceso
    if (!requiredRoles) {
      return true;
    }

    // Obtener la solicitud y los datos del usuario adjuntados por el AuthGuard
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Verificar si el usuario tiene alguno de los roles requeridos
    const hasRole = requiredRoles.some((role) => user.role?.includes(role));

    if (!hasRole) {
      throw new ForbiddenException("You do not have the necessary permissions");
    }

    return hasRole; // Si tiene el rol, permite el acceso
  }
}
