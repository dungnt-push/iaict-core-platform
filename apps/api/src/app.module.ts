import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { ProducerModule } from './modules/producer/producer.module';
import { SubjectModule } from './modules/subject/subject.module';
import { EventModule } from './modules/event/event.module';
import { HealthController } from './modules/health/health.controller';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
    ProducerModule,
    SubjectModule,
    EventModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}