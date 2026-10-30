# NestJS API - IAICT Core Platform

## Endpoints cơ bản

- `GET /tenants` - list tenants
- `POST /tenants` - create tenant `{name, slug}`
- `GET /producers` (header `x-tenant-id`)
- `POST /producers` (header `x-tenant-id`)
- `GET /subjects` (header `x-tenant-id`)
- `POST /subjects` (header `x-tenant-id`)
- `GET /events` (header `x-tenant-id`)
- `POST /events` (header `x-tenant-id`)

## Chạy local

```bash
docker compose -f docker/docker-compose.yml up --build
```

API sẽ chạy tại `http://localhost:3000`
