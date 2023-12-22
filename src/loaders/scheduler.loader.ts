import { MicroframeworkSettings } from 'microframework';
import { ScrapeImages } from '../schedulers';
import { SchedulerInitializer, CronScheduler } from '../library';

export const schedulerLoader = async (settings: MicroframeworkSettings | undefined) => {
  const schedulers: CronScheduler[] = [];
  const imageScrapeScheduler = new ScrapeImages(10, 100);

  schedulers.push(new CronScheduler(imageScrapeScheduler.name, '*/1 * * * *', imageScrapeScheduler.onTick));

  const schedulerInitializer = new SchedulerInitializer(schedulers);
  schedulerInitializer.startAll();

  if (settings) {
    settings.onShutdown(() => schedulerInitializer.stopAll());
  }
};
