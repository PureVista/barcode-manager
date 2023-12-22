import { CronScheduler } from './CronScheduler';

export class SchedulerInitializer {
  constructor(public schedulers: CronScheduler[]) {}

  async startAll(): Promise<void> {
    this.schedulers.forEach((scheduler: CronScheduler) => {
      scheduler.start();
    });
  }

  async stopAll(): Promise<void> {
    this.schedulers.forEach((scheduler: CronScheduler) => {
      scheduler.stop();
    });
  }

  async restartAll(): Promise<void> {
    this.schedulers.forEach((scheduler: CronScheduler) => {
      scheduler.restart();
    });
  }
}
