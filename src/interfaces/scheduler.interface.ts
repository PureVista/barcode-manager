export interface IScheduler {
  name: string;
  batchSize: number;
  limit: number;
  onTick(): void;
}
