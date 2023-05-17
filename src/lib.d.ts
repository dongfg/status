declare module "icmp" {
  function ping(host: string, timeout?: number): Promise<void>;
}
