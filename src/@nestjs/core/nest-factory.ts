import { Logger } from './logger'
import { NestApplication } from './nest-application'

export class NestFactory {
  static async create(module: any): Promise<NestApplication> {
    Logger.log('Starting Nest application..', 'NestFactory')
    const app = new NestApplication(module)
    return app
  }
}