import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from '../../dto';
import { TenantGuard } from '../../guards/tenant.guard';

@Controller('subjects')
@UseGuards(TenantGuard)
export class SubjectController {
  constructor(private service: SubjectService) {}

  @Get()
  list(@Req() req: any) {
    return this.service.list(req.tenantId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateSubjectDto) {
    return this.service.create(req.tenantId, dto);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
