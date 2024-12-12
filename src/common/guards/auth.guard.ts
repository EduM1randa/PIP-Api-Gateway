import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1]; // Asumiendo que el token está en formato "Bearer <token>"
    
    try {
      // Verifica el token usando la clave secreta definida en el módulo
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET, // Asegúrate de usar el mismo secreto que se utiliza para firmar los tokens
      });

      // Adjuntar la información del usuario decodificado al objeto request
      request.user = decoded; // Decoded incluirá información como el userId y otros datos

      return true; // Permitir el acceso si el token es válido
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
