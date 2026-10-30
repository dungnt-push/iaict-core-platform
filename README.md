# IAICT Core Platform

**Nền tảng lõi quản lý sản xuất, tài nguyên, chuỗi giá trị và vận hành thương mại SaaS**  
Nông - Lâm - Ngư nghiệp đa khách hàng, đa ngành (theo SOW v2.0.7-R18)

## Nguyên tắc khóa (theo SOW)

- **Core Domain trung lập ngành**: Không hard-code MotherPlant, PigHerd, ShrimpPond, ForestStand... vào Core.
- Subject = Individual | Group | Cohort | Population | AreaBasedAsset (generic).
- Vertical Pack chỉ ánh xạ Domain Alias + extension schema/form/rule/report.
- Tenant là ranh giới cách ly/thương mại (không đồng nhất địa giới).
- Event Ledger → Current State (không sửa đè mất dấu vết).
- Payer có thể khác Beneficiary.
- Blockchain/Data Integrity chỉ là cơ chế kỹ thuật, không phải SKU thương mại độc lập.

## Tech baseline (khuyến nghị SOW)

- Backend: NestJS + TypeScript
- ORM: Prisma + PostgreSQL 15+
- Mobile: Flutter (offline-first) — phase sau
- Web: React/Vue
- Deploy: Docker Compose
- IoT: MQTT / ChirpStack compatible

## Cấu trúc thư mục

```
iaict-core-platform/
├── apps/
│   ├── api/          # NestJS backend
│   └── web/          # Admin / Tenant Experience (sau)
├── packages/
│   ├── core-domain/  # Entities, types, domain services
│   └── vertical-pack-framework/
├── prisma/
│   └── schema.prisma
├── docs/
├── docker/
└── README.md
```

## Trạng thái hiện tại (29/10/2026)

- [x] Project structure monorepo
- [x] **Prisma Core Domain schema** (Tenant, AdminUnit, Producer, Site, SpatialUnit, ProductionUnit, Subject, ProductionCycle, DomainEvent, CurrentState, OutputLot, Subscription, Entitlement, VerticalPack)
- [x] Core Domain TypeScript types
- [x] Docker Compose baseline (PostgreSQL)
- [x] Docs: CORE_DOMAIN.md + Vertical Pack Framework notes
- [ ] NestJS API skeleton + multi-tenant context
- [ ] Event → Current State rebuild service
- [ ] Vertical Pack loader
- [ ] Seed data + Vertical Pack 01 stub
- [ ] Basic REST API (Producer / Subject / Event)

## Cách chạy (sau khi cài)

```bash
cd iaict-core-platform
npm install
cp .env.example .env   # DATABASE_URL=postgresql://iaict:iaict_dev@localhost:5432/iaict_core
docker compose -f docker/docker-compose.yml up -d
npx prisma generate
npx prisma db push
```

## Nguyên tắc đang tuân thủ

- Core Domain **không** chứa MotherPlant / PigHerd / ShrimpPond / ForestStand.
- Mọi biến động đi qua **DomainEvent**.
- Tenant isolation bắt buộc.
- Vertical Pack chỉ là config + alias + extension.

---

*Bắt đầu từ Core Domain model theo Mục 3 & 1.3 SOW.*
