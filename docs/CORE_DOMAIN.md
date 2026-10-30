# Core Domain Notes (theo SOW Mục 3 & 1.3)

## Nguyên tắc bắt buộc

1. **Core không biết "cây đầu dòng"**.  
   MotherPlant / Cây đầu dòng = Domain Alias của `Subject` với `subjectType = INDIVIDUAL` trong Vertical Pack 01.

2. **Subject types (generic)**:
   - INDIVIDUAL
   - GROUP
   - COHORT
   - POPULATION
   - AREA_BASED_ASSET

3. **ProductionCycle ≠ Subject**.  
   Vụ / lứa / chu kỳ là ProductionCycle, có thể liên kết Subject.

4. **Event Ledger → Current State**:
   - Mọi biến động số lượng/trạng thái phải có DomainEvent.
   - CurrentState là projection có thể rebuild.
   - Correction = event mới, không sửa đè.

5. **Tenant isolation**: Mọi bản ghi nghiệp vụ phải mang `tenantId`.

6. **SpatialUnit ≠ ProductionUnit**:
   - SpatialUnit: không gian (geometry).
   - ProductionUnit: đơn vị vận hành (có thể tham chiếu SpatialUnit).

## Mapping ví dụ (chỉ nằm trong Vertical Pack)

| Vertical Pack | Core | Domain Alias |
|---------------|------|--------------|
| Plant/Forestry | Subject=INDIVIDUAL | Cây đầu dòng |
| Plant/Forestry | Subject=AREA_BASED_ASSET | Lâm phần |
| Livestock | Subject=GROUP/COHORT | Đàn / Lứa |
| Aquaculture | Subject=POPULATION/COHORT | Quần thể tôm/cá |
| Aquaculture | ProductionUnit | Ao / Lồng |

## Next steps

- [ ] NestJS app skeleton + multi-tenant interceptor
- [ ] CRUD API cho Producer / Site / Subject / ProductionCycle / DomainEvent
- [ ] Current State rebuild service
- [ ] Vertical Pack loader (manifest validation)
- [ ] Seed Vertical Pack 01
