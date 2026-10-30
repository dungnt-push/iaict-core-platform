import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTenantDto } from '../dto';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.tenant.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateTenantDto) {
    return this.prisma.tenant.create({
      data: {
        name: dto.name,
        slug: dto.slug,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }
}
