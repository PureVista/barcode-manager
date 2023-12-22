import { CronCommand, CronJob } from 'cron';

export class CronScheduler {
  job: CronJob;

  constructor(public name: string, public timePattern: string, public onTick: Function) {
    this.job = new CronJob(timePattern, onTick as CronCommand<null>, null, true, 'Europe/Istanbul');
  }

  restart(): boolean {
    if (!this.job.running) {
      this.job.start();
      return true;
    }
    return false;
  }

  start(): boolean {
    this.job.start();
    console.info(`${this.name} started!! Running status: ${this.isRunning()}`);
    return true;
  }

  stop(): boolean {
    this.job.stop();
    console.info(`${this.name} stopped! Running status: ${this.isRunning()}`);
    return true;
  }

  private isRunning(): boolean {
    if (this.job.running) {
      return true;
    }
    return false;
  }
}
