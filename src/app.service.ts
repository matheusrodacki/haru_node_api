import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    //redirect to https://haru.digital
    return '<script>window.location.href="https://haru.digital";</script>';
  }
}
