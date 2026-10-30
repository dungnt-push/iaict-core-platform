import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from '../../dto';
import { TenantGuard } from '../../guards/tenant.guard';

@Controller('events')
@UseGuards(TenantGuard)
export class EventController {
  constructor(private service: EventService) {}

  @Get()
  list(@Req() req: any) {
    return this.service.list(req.tenantId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateEventDto) {
    return this.service.create(req.tenantId, dto);
  }
}
