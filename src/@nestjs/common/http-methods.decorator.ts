import 'reflect-metadata'


// 请求方法（GET、POST）
// 请求路径
export function Get(path: string = ''): MethodDecorator {
  return (traget, propertyKey, descriptor) => {
    Reflect.defineMetadata('path', path, descriptor.value)
    Reflect.defineMetadata('method', 'GET', descriptor.value)
  }
}

export function Post(path: string = ''): MethodDecorator {
  return (traget, propertyKey, descriptor) => {
    Reflect.defineMetadata('path', path, descriptor.value)
    Reflect.defineMetadata('method', 'POST', descriptor.value)
  }
}