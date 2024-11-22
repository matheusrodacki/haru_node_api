import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { CreateContractDto } from './dto/create.contract.dto';
import { UpdateContractDto } from './dto/update.contract.dto';
import { Client } from '../clients/client.entity';
import { Plan } from '../plans/plan.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const client = await this.clientRepository.findOneOrFail({
      where: { id_client: createContractDto.client_id },
    });

    const plan = await this.planRepository.findOneOrFail({
      where: { id_plan: createContractDto.plan_id },
    });

    const contract = this.contractRepository.create({
      client,
      plan,
      contracted_price: plan.price,
      contract_date: new Date(),
      status: createContractDto.status || 'Active',
    });

    const savedContract = await this.contractRepository.save(contract);

    // Transforma a entidade em DTO
    return plainToInstance(ContractDto, savedContract, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<Contract[]> {
    return await this.contractRepository.find({});
  }

  async findOne(contract_id: number): Promise<Contract> {
    return this.contractRepository.findOne({
      where: { contract_id },
    });
  }

  async update(
    contract_id: number,
    updateContractDto: UpdateContractDto,
  ): Promise<Contract> {
    const contract = await this.contractRepository.findOne({
      where: { contract_id },
    });
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }
    Object.assign(contract, updateContractDto);
    return await this.contractRepository.save(contract);
  }

  async remove(contract_id: number): Promise<void> {
    const contract = await this.contractRepository.findOne({
      where: { contract_id },
    });
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    await this.contractRepository.remove(contract);
  }
}
