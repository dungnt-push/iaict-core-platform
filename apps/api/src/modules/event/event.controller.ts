import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('events')
export class EventController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Headers('x-tenant-id') tenantId: string) {
    return this.prisma.domainEvent.findMany({
      where: { tenantId },
      orderBy: { occurredAt: 'desc' },
      take: 50,
    });
  }

  @Post()
  async create(
    @Headers('x-tenant-id') tenantId: string,
    @Body() body: { subjectId?: string; eventType: string; payload?: any; occurredAt?: string },
  ) {
    return this.prisma.domainEvent.create({
      data: {
        tenantId,
        subjectId: body.subjectId,
        eventType: body.eventType,
        payload: body.payload || {},
        occurredAt: body.occurredAt ? new Date(body.occurredAt) : new Date(),
      },
    });
  }
}
