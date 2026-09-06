import { Body, Controller, Delete, HttpCode, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { Request, Response } from 'express';
import { Auth } from './decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({passthrough: true}) res: Response) {
    const {refreshToken, ...response} = await this.authService.login(dto)
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto, @Res({passthrough: true}) res: Response) {
    const {refreshToken, ...response} = await this.authService.register(dto)
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(
    @Req() req: Request,
    @Res({passthrough: true}) res: Response
  ) {
    const refreshTokenFromCookies = req.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException('Токен обновления не передан. Необходимо войти в систему заново')
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(refreshTokenFromCookies)
    
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Res({passthrough: true}) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res)

    return true
  }

  @HttpCode(200)
  @Delete('account')
  @Auth()
  async deleteAccount(
    @CurrentUser('id') id: string,
    @Body() dto: DeleteAccountDto,
    @Res({passthrough: true}) res: Response
  ) {
    await this.authService.deleteAccount(id, dto.password)
    this.authService.removeRefreshTokenFromResponse(res)

    return true
  }
}
