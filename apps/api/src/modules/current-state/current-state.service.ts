import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CurrentStateService {
  constructor(private prisma: PrismaService) {}

  /**
   * Rebuild CurrentState for a subject from all its DomainEvents.
   * This is the authoritative projection (SOW: Event Ledger → Current State).
   */
  async rebuildForSubject(subjectId: string) {
    const events = await this.prisma.domainEvent.findMany({
      where: { subjectId },
      orderBy: { occurredAt: 'asc' },
    });

    let quantity = 0;
    let status = 'ACTIVE';
    let lastEventId: string | null = null;

    for (const ev of events) {
      const payload = ev.payload as any;
      if (typeof payload?.quantityDelta === 'number') {
        quantity += payload.quantityDelta;
      }
      if (payload?.status) status = payload.status;
      lastEventId = ev.id;
    }

    const state = {
      quantity,
      status,
      lastEventId,
      eventCount: events.length,
    };

    return this.prisma.currentState.upsert({
      where: { subjectId },
      create: {
        subjectId,
        state,
        lastEventId,
        version: 1,
      },
      update: {
        state,
        lastEventId,
        version: { increment: 1 },
        asOf: new Date(),
      },
    });
  }

  async get(subjectId: string) {
    return this.prisma.currentState.findUnique({ where: { subjectId } });
  }
}
