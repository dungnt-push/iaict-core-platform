# Vertical Pack Framework

Framework để nạp Vertical Pack có version, không fork Core.

## Manifest bắt buộc (theo Phụ lục F.6)

- packId, name, version, coreCompatibility
- Domain Aliases (chỉ trong pack)
- Extension schema trên Core entities
- Forms / Workflow / Rule Pack / Report / Role template
- Device/Measurement profile
- Migration & compatibility

## Vertical Pack 01 (Plant/Forestry - Pilot)

- Alias: Subject.INDIVIDUAL → Cây đầu dòng
- Alias: SpatialUnit / ProductionUnit → Thửa / Vùng nguyên liệu
- Rule Pack: CMP-01..CMP-12 (canh tác & điều kiện xuất)
- CTE/KDE theo Phụ lục G

## Qualification (M7)

- Aquaculture Qualification Pack
- Livestock Qualification Scenario

Không hard-code tên ngành vào Core schema/enum.
