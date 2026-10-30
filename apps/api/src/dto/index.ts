import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}

export class CreateProducerDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  type?: string;
}

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  subjectType?: string;

  @IsString()
  @IsOptional()
  producerId?: string;
}

export class CreateEventDto {
  @IsString()
  @IsOptional()
  subjectId?: string;

  @IsString()
  @IsNotEmpty()
  eventType: string;

  @IsOptional()
  payload?: any;

  @IsString()
  @IsOptional()
  occurredAt?: string;
}
