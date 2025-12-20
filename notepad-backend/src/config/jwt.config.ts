import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJwtConfig = async (
    configService: ConfigService
): Promise<JwtModuleOptions> => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
        algorithm: 'HS256'
    },
    verifyOptions: {
        algorithms: ['HS256'],
        ignoreExpiration: false // не принимать просроченные токены
    }
})