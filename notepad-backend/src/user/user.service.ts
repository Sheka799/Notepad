import { BadRequestException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.servive'
import { UserDto } from './dto/user.dto'
import * as sharp from 'sharp'
import * as fs from 'fs'
import { User } from '@prisma/client'
import { StorageService } from '../storage/storage.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UserService {
	private readonly S3_URL: string

	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly storageService: StorageService
	) {
    	this.S3_URL = configService.getOrThrow<string>('S3_URL');
  	}

	async getById(id: string) {
		return this.prismaService.user.findUnique({
			where: {
				id
			},
			include: {
				notepads: true
			}
		})
	}

	async getByEmail(email: string) {
		return this.prismaService.user.findUnique({
			where: {
				email
			}
		})
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)

		const { password, ...rest } = profile

		return {
			user: rest
		}
	}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: '',
			password: await hash(dto.password)
		}

		return this.prismaService.user.create({
			data: user
		})
	}

	async update(id: string, dto: UserDto) {
		let data = dto

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}

		return this.prismaService.user.update({
			where: {
				id
			},
			data,
			select: {
				name: true,
				email: true
			}
		})
	}

	async uploadAvatar(user: User, file) {
		if (user.avatar) {
			await this.storageService.remove(user.avatar)
		}
		
		let buffer: Buffer

		if (file.buffer) {
			buffer = file.buffer
		} else if (file.path) {
			buffer = await fs.readFileSync(file.path)
			await fs.unlinkSync(file.path)
		} else {
			throw new BadRequestException('Файл не имеет буфера или пути')
		}

		const processedBuffer = await sharp(buffer)
			.resize(512, 512, {
				fit: 'cover',
				withoutEnlargement: true // Не увеличивать маленькие изображения
			})
			.webp({
				quality: 80, // Уменьшаем качество для меньшего размера
				effort: 4 // Оптимизация скорости/качества (1-6)
			})
			.toBuffer()

		const fileName = `avatars/${user.id}-${Date.now()}.webp`
		
		await this.storageService.upload(processedBuffer, fileName, 'image/webp')
		await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				avatar: fileName,
				avatarUrl: `${this.S3_URL}/${fileName}`
			}
		})

		return true
	}

	async deleteAvatar(user: User) {
		if (!user.avatar) {
			return
		}

		await this.storageService.remove(user.avatar)

		await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				avatar: null,
				avatarUrl: null
			}
		})

		return true
	}
}
