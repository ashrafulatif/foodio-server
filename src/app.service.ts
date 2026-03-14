import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  rootApi(): string {
    return 'Root API Welcome to Foodle API!';
  }
}
