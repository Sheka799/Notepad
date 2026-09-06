import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { Response } from 'express';
import { isDev } from 'src/utils/is-dev.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1
  REFRESH_TOKEN_NAME = 'refreshToken' 

  private readonly COOKIE_DOMAIN: string

  constructor(
    private jwt: JwtService,
		private readonly configService: ConfigService,
    private userService: UserService
  ) {
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN')
  }

  async login(dto: AuthDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...user} = await this.validateUser(dto)
    const tokens = this.issueTokens(user.id)

    return {
      user,
      ...tokens
    }
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email)

    if (oldUser) throw new BadRequestException('Пользователь уже существует')

    const {password, ...user} = await this.userService.create(dto)

    const tokens = this.issueTokens(user.id)

    return {
        user,
        ...tokens
    }
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)
    if (!result) throw new UnauthorizedException('Недопустимый токен обновления')

    const {password, ...user} = await this.userService.getById(result.id)

    const tokens = this.issueTokens(user.id)

    return {
      user,
      ...tokens
    }
  }

  private issueTokens(userId: string) {
    const data = {id: userId}

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d'
    })

    return {accessToken, refreshToken}
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email)

    if (!user) throw new UnauthorizedException('Неверный email или пароль')

    const isValid = await verify(user.password, dto.password)

    if (!isValid) throw new UnauthorizedException('Неверный email или пароль')

    return user
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires: expiresIn,
      secure: !isDev(this.configService),
      sameSite: 'lax'
    })
  }

  async deleteAccount(userId: string, password: string) {
    const user = await this.userService.getById(userId)

    if (!user) throw new UnauthorizedException('Пользователь не найден')

    const isValid = await verify(user.password, password)

    if (!isValid) throw new UnauthorizedException('Неверный пароль')

    await this.userService.deleteAccount(user)
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires: new Date(0),
      secure: !isDev(this.configService),
      sameSite: 'lax'
    })
  } 
}
