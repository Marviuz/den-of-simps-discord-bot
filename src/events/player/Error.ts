import { PlayerEvent } from '@/lib/Event';

export default new PlayerEvent('error', async (queue, error) => {
  console.log(queue, error);
});
