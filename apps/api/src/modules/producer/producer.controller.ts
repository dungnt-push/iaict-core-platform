import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from '../../dto';
import { TenantGuard } from '../../guards/tenant.guard';

@Controller('producers')
@UseGuards(TenantGuard)
export class ProducerController {
  constructor(private service: ProducerService) {}

  @Get()
  list(@Req() req: any) {
    return this.service.list(req.tenantId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateProducerDto) {
    return this.service.create(req.tenantId, dto);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
