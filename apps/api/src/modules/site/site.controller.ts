import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { SiteService } from './site.service';
import { TenantGuard } from '../../guards/tenant.guard';

@Controller('sites')
@UseGuards(TenantGuard)
export class SiteController {
  constructor(private service: SiteService) {}

  @Get()
  list(@Req() req: any) {
    return this.service.list(req.tenantId);
  }

  @Post()
  create(@Req() req: any, @Body() body: any) {
    return this.service.create(req.tenantId, body);
  }
}
