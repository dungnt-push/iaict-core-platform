import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from '../dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async list(tenantId: string) {
    return this.prisma.domainEvent.findMany({
      where: { tenantId },
      orderBy: { occurredAt: 'desc' },
      take: 100,
      include: { subject: true },
    });
  }

  async create(tenantId: string, dto: CreateEventDto) {
    return this.prisma.domainEvent.create({
      data: {
        tenantId,
        subjectId: dto.subjectId,
        eventType: dto.eventType,
        payload: dto.payload || {},
        occurredAt: dto.occurredAt ? new Date(dto.occurredAt) : new Date(),
      },
    });
  }
}
