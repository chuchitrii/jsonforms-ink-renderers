// Mock stdin completely for Ink's focus system
// We need to create a mock that properly supports all stream methods
const createStdinMock = (): any => {
  const mock: any = {
    isTTY: false,  // Set to false to disable TTY features
    setRawMode: () => mock,
    resume: () => mock,
    pause: () => mock,
    setEncoding: () => mock,
    on: () => mock,
    off: () => mock,
    once: () => mock,
    removeListener: () => mock,
    addListener: () => mock,
    emit: () => true,
    ref: () => mock,
    unref: () => mock,
    isPaused: () => false,
    pipe: () => mock,
    unpipe: () => mock,
    read: () => null,
    unshift: () => {},
    wrap: () => mock,
    setMaxListeners: () => mock,
    getMaxListeners: () => 10,
    listeners: () => [],
    rawListeners: () => [],
    listenerCount: () => 0,
    eventNames: () => [],
    prependListener: () => mock,
    prependOnceListener: () => mock,
  };
  return mock;
};

// Replace stdin globally using Object.defineProperty
Object.defineProperty(process, 'stdin', {
  value: createStdinMock(),
  writable: true,
  configurable: true,
});
