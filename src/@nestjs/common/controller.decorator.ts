import 'reflect-metadata'

interface ControllerOptions {
  prefix?: string
}

// Controller主要是获取路由前缀路径

// 参数可以传，可以不传所以使用函数重载
export function Controller(): ClassDecorator
export function Controller(prefix: string): ClassDecorator
export function Controller(controllOptions: ControllerOptions): ClassDecorator

export function Controller(prefixOptions?: ControllerOptions | string): ClassDecorator {

  let options: ControllerOptions = {}
  if(typeof prefixOptions === 'string') {
    options.prefix = prefixOptions
  } else if(typeof prefixOptions === 'object') {
    options = prefixOptions
  }
  return (target) => {
    Reflect.defineMetadata('prefix', options.prefix || '', target)
  }
}
