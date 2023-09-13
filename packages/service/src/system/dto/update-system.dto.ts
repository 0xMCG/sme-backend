import { PartialType } from '@nestjs/swagger';
import { Royalties } from './create-royalties.dto';

export class UpdateSystemDto extends PartialType(Royalties) {}
