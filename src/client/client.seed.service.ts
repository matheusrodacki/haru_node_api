import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const logger = new Logger('AdminSeedService');

@Injectable()
export class ClientSeedService implements OnModuleInit {
  constructor() {}

  async onModuleInit() {
    logger.log('Initializing client seed data...');
    logger.log('Finished client seeding data!');
  }
}
