import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { ProducerModule } from './modules/producer/producer.module';
import { SubjectModule } from './modules/subject/subject.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
    ProducerModule,
    SubjectModule,
    EventModule,
  ],
})
export class AppModule {}
