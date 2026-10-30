import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('producers')
export class ProducerController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Headers('x-tenant-id') tenantId: string) {
    return this.prisma.producer.findMany({
      where: { tenantId },
      take: 100,
    });
  }

  @Post()
  async create(
    @Headers('x-tenant-id') tenantId: string,
    @Body() body: { code: string; name: string; type?: string },
  ) {
    return this.prisma.producer.create({
      data: {
        tenantId,
        code: body.code,
        name: body.name,
        type: body.type || 'HOUSEHOLD',
      },
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.prisma.producer.findUnique({ where: { id } });
  }
}
