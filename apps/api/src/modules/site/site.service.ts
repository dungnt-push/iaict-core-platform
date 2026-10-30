import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SiteService {
  constructor(private prisma: PrismaService) {}

  async list(tenantId: string) {
    return this.prisma.site.findMany({
      where: { tenantId },
      include: { producer: true, productionUnits: true },
      orderBy: { code: 'asc' },
    });
  }

  async create(tenantId: string, data: { code: string; name: string; type?: string; producerId?: string }) {
    return this.prisma.site.create({
      data: {
        tenantId,
        code: data.code,
        name: data.name,
        type: data.type || 'farm',
        producerId: data.producerId,
      },
    });
  }
}
