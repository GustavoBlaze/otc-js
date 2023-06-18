export default function createLogger(name: string) {
  return {
    debug: (...args: any[]) => {
      console.debug(`[${name}]:`, ...args);
    },
    info: (...args: any[]) => {
      console.info(`[${name}]:`, ...args);
    },
    warn: (...args: any[]) => {
      console.warn(`[${name}]:`, ...args);
    },
    error: (...args: any[]) => {
      console.error(`[${name}]:`, ...args);
    },
    log: (...args: any[]) => {
      console.log(`[${name}]:`, ...args);
    },
  };
}
