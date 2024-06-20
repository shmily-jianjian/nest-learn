import 'reflect-metadata'

export const createParamDecorator = (key: string) => {
  // target 构造函数的原型对象
  // propertyKey 方法名
  // parameterIndex 参数位置索引下标
  return (attribute?: any) => (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    const existingParameters = Reflect.getMetadata(`params${key}`, target, propertyKey) || []
    existingParameters.push({
      index: parameterIndex,
      key,
      attribute
    })
    Reflect.defineMetadata(`params${String(propertyKey)}`, existingParameters, target, propertyKey);
  }
}

export const Request = createParamDecorator('Request')
export const Req = createParamDecorator('Req')