import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('tenants')
export class TenantController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.tenant.findMany({ take: 50 });
  }

  @Post()
  async create(@Body() body: { name: string; slug: string }) {
    return this.prisma.tenant.create({
      data: {
        name: body.name,
        slug: body.slug,
      },
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }
}
