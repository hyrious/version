/** Add `--version` to your cli. */
export function version(): void;
export function version(version: string): void;
export function version(getVersion: () => string | Promise<string>): void;
