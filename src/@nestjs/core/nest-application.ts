import express, { Express, Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express'
import { Logger } from './logger'
import 'reflect-metadata'
import path from 'path'

export class NestApplication {
  private readonly app: Express = express()
  private readonly module: any

  constructor(module: any) {
    this.module = module
  }

  async init() {
    const controllers = Reflect.getMetadata('controllers', this.module) || []
    Logger.log('AppModule dependencies initialized', 'InstanceLoader')

    for(const Controller of controllers) {
      const controller = new Controller()
      const prefix = Reflect.getMetadata('prefix', Controller)
      Logger.log(`${Controller.name} {${prefix}}:`, 'RoutesResolver');
      const controllerPrototype = Reflect.getPrototypeOf(controller);
      for(const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
        const method = controllerPrototype[methodName]
        const pathMetadata = Reflect.getMetadata('path', method)
        const httpMethod = Reflect.getMetadata('method', method)
        if(httpMethod) {
          const routePath = path.posix.join('/', prefix, pathMetadata)
          this.app[httpMethod.toLowerCase()](routePath, async(req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
            // 解析参数
            const args = this.resolveparams(controller, methodName, req, res, next)
            const result = await method.call(controller, ...args)
            res.send(result) 
          })
          Logger.log(`Mapped {${routePath}, ${httpMethod}} route`, 'RouterExplorer');
        }
      }
    }
    Logger.log('Nest application successfully started', 'NestApplication');
  }

  private resolveparams(instance: any, methodName: string, req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
    const paramsMetadata = Reflect.getMetadata(`params${methodName}`, instance, methodName) || []
    return paramsMetadata.sort((a: any, b: any) => a.index - b.index).map((param: any) => {
      const {key} = param;
      switch (key) {
        case 'Request':
        case 'Req':
          return req;
        default:
          return null;
      }
    });
  }

  async listen(port: number) {
    await this.init()
    this.app.listen(port, () => {
      Logger.log(`Application is running on: http://localhost:${port}`, 'NestApplication');
    })
  }
}