import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDto } from '../dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async list(tenantId: string) {
    return this.prisma.subject.findMany({
      where: { tenantId },
      include: { currentState: true },
      orderBy: { code: 'asc' },
      take: 200,
    });
  }

  async create(tenantId: string, dto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: {
        tenantId,
        code: dto.code,
        name: dto.name,
        subjectType: dto.subjectType || 'INDIVIDUAL',
        producerId: dto.producerId,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.subject.findUnique({
      where: { id },
      include: { currentState: true, producer: true },
    });
  }
}
