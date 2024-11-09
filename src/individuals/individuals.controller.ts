import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IndividualsService } from './individuals.service';
import { UpdateIndividualDto } from './dto/update-individual.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { IndividualDto } from './dto/individual.dto';

@ApiTags('Individuals')
@Controller('individuals')
export class IndividualsController {
  constructor(private readonly individualsService: IndividualsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN) // Customize role as needed
  @ApiOperation({ summary: 'Create an individual associated with a client' })
  create(@Body() IndividualDto: IndividualDto) {
    return this.individualsService.create(IndividualDto);
  }

  @Get()
  findAll() {
    return this.individualsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.individualsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIndividualDto: UpdateIndividualDto,
  ) {
    return this.individualsService.update(+id, updateIndividualDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.individualsService.remove(+id);
  }
}
