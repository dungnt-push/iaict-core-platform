import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('subjects')
export class SubjectController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Headers('x-tenant-id') tenantId: string) {
    return this.prisma.subject.findMany({
      where: { tenantId },
      take: 100,
    });
  }

  @Post()
  async create(
    @Headers('x-tenant-id') tenantId: string,
    @Body() body: { code: string; name?: string; subjectType?: string; producerId?: string },
  ) {
    return this.prisma.subject.create({
      data: {
        tenantId,
        code: body.code,
        name: body.name,
        subjectType: body.subjectType || 'INDIVIDUAL',
        producerId: body.producerId,
      },
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.prisma.subject.findUnique({
      where: { id },
      include: { currentState: true },
    });
  }
}
