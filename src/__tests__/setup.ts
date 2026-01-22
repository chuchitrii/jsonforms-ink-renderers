// Mock stdin for Ink's focus system
const mockStdin: any = {
  isTTY: true,
  setRawMode: () => mockStdin,
  resume: () => mockStdin,
  pause: () => mockStdin,
  setEncoding: () => mockStdin,
  on: () => mockStdin,
  off: () => mockStdin,
  once: () => mockStdin,
  removeListener: () => mockStdin,
  addListener: () => mockStdin,
  emit: () => true,
  ref: () => mockStdin,
  unref: () => mockStdin,
  isPaused: () => false,
  pipe: () => mockStdin,
  unpipe: () => mockStdin,
  read: () => null,
  unshift: () => {},
  wrap: () => mockStdin,
  setMaxListeners: () => mockStdin,
  getMaxListeners: () => 10,
  listeners: () => [],
  rawListeners: () => [],
  listenerCount: () => 0,
  eventNames: () => [],
  prependListener: () => mockStdin,
  prependOnceListener: () => mockStdin,
};

Object.defineProperty(process, 'stdin', {
  value: mockStdin,
  writable: true,
  configurable: true,
});

// Suppress console errors during tests
const originalConsole = { ...console };
global.console = {
  ...originalConsole,
  error: () => {},
  warn: () => {},
};
