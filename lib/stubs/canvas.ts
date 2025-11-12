const handler: ProxyHandler<any> = {
  get() {
    throw new Error('The "canvas" package is not available in this environment.')
  },
  apply() {
    throw new Error('The "canvas" package is not available in this environment.')
  },
}

const noop = () => undefined

const canvasStub = new Proxy(noop, handler)

export default canvasStub
export const createCanvas = canvasStub
export const Image = canvasStub

