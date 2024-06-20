import 'reflect-metadata'

export interface ModuleMetadata {
  controllers?: Function[]
}

export function Module(metadata: ModuleMetadata): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata('controllers', metadata.controllers, target)
  }
}