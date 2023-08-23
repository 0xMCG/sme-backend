import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { SystemService } from './system.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { Web3AuthGuardInterceptor } from 'src/web3-auth-guard/web3-auth-guard.interceptor';
import { ConfigService } from '@nestjs/config';

@Controller('system')
export class SystemController {
  private platformFee;

  constructor(
    private readonly systemService: SystemService,
    private readonly configService: ConfigService,
  ) {
    this.platformFee = this.configService.get('PLATFORM_FEE');
  }

  @Post()
  @UseInterceptors(Web3AuthGuardInterceptor)
  create(@Body() data: any) {
    console.log('executor', data)
    return this.systemService.create(data);
  }

  @Get('platformFee')
  getPlatformFee() {
    return this.platformFee;
  }

  @Get()
  findAll(@Param('executor') executor: any) {
    console.log('executor', executor)
    return this.systemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemDto: UpdateSystemDto) {
    return this.systemService.update(+id, updateSystemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemService.remove(+id);
  }
}
