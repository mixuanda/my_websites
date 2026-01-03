import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/Users/mixuanda/Github/my_websites/tina/__generated__/.cache/1767438833760', url: 'http://localhost:4001/graphql', token: '', queries,  });
export default client;
  