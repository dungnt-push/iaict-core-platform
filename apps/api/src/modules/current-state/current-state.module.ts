import { Module } from '@nestjs/common';
import { CurrentStateController } from './current-state.controller';
import { CurrentStateService } from './current-state.service';

@Module({
  controllers: [CurrentStateController],
  providers: [CurrentStateService],
  exports: [CurrentStateService],
})
export class CurrentStateModule {}
