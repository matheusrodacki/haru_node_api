import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClientDatabaseProvider } from 'src/database/providers/client-database.provider';

@Injectable()
export class ClientMiddleware implements NestMiddleware {
  constructor(
    private readonly clientDatabaseProvider: ClientDatabaseProvider,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const clientId = req.headers['x-client-id'] as string;

    if (!clientId) {
      return res
        .status(400)
        .json({ message: 'Client ID is missing in headers' });
    }

    try {
      const connection =
        await this.clientDatabaseProvider.getClientConnection(clientId);
      req['clientConnection'] = connection; // Anexa a conexão ao request
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error connecting to client database', error });
    }
  }
}
