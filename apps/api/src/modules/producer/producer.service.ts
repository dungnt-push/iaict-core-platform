import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProducerDto } from '../dto';

@Injectable()
export class ProducerService {
  constructor(private prisma: PrismaService) {}

  async list(tenantId: string) {
    return this.prisma.producer.findMany({
      where: { tenantId },
      orderBy: { code: 'asc' },
      take: 200,
    });
  }

  async create(tenantId: string, dto: CreateProducerDto) {
    return this.prisma.producer.create({
      data: {
        tenantId,
        code: dto.code,
        name: dto.name,
        type: dto.type || 'HOUSEHOLD',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.producer.findUnique({ where: { id } });
  }
}
