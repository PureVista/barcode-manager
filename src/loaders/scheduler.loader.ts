import { MicroframeworkSettings } from 'microframework';
import { SearchImages } from '../schedulers';
import { SchedulerInitializer, CronScheduler } from '../library';

export const schedulerLoader = async (settings: MicroframeworkSettings | undefined) => {
  const schedulers: CronScheduler[] = [];
  const imageSearcher = new SearchImages(10, 100);

  schedulers.push(new CronScheduler(imageSearcher.name, '*/1 * * * *', imageSearcher.onTick));

  const schedulerInitializer = new SchedulerInitializer(schedulers);
  schedulerInitializer.startAll();

  if (settings) {
    settings.onShutdown(() => schedulerInitializer.stopAll());
  }
};
