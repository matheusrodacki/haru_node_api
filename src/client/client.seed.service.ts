import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AddressesClientService } from './addresses_client/addresses.service';
import { CreateAddressClientDto } from './addresses_client/dto/create-address.dto';
import { ClientDatabaseProvider } from 'src/database/providers/client-database.provider';
import { Request } from 'express';

const logger = new Logger('AdminSeedService');

@Injectable()
export class ClientSeedService implements OnModuleInit {
  constructor(
    private readonly addressesClientService: AddressesClientService,
    private readonly clientDatabaseProvider: ClientDatabaseProvider,
  ) {}

  async onModuleInit() {
    logger.log('Initializing client seed data...');

    // Emular o fluxo do middleware
    const req = {
      headers: {
        'x-client-id': 1, // Substitua pelo clientId necessário
      },
      clientConnection: null, // Inicialize com null ou um valor adequado
    } as unknown as Request & { clientConnection?: any };

    try {
      const connection = await this.clientDatabaseProvider.getClientConnection(
        req.headers['x-client-id'] as string,
      );
      const clientAddress =
        await this.addressesClientService.findAll(connection);

      if (clientAddress.length === 0) {
        logger.log('Seeding client address data...');

        const address = {
          street: 'Rua dos Alfineiros',
          number: '4',
          additionalInfo: 'Armário debaixo da escada',
          city: 'São ',
          state: 'SP',
          country: 'Brasil',
          postalCode: '00000-000',
          address_type: 'billing',
        };

        await this.addressesClientService.create(
          address as CreateAddressClientDto,
          connection,
        );
      }
    } catch (error) {
      logger.error('Error seeding client data:', error);
    }

    logger.log('Finished client seeding data!');
  }
}
