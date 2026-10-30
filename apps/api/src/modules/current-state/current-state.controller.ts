import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { CurrentStateService } from './current-state.service';
import { TenantGuard } from '../../guards/tenant.guard';

@Controller('current-state')
@UseGuards(TenantGuard)
export class CurrentStateController {
  constructor(private service: CurrentStateService) {}

  @Post('rebuild/:subjectId')
  rebuild(@Param('subjectId') subjectId: string) {
    return this.service.rebuildForSubject(subjectId);
  }

  @Get(':subjectId')
  get(@Param('subjectId') subjectId: string) {
    return this.service.get(subjectId);
  }
}
