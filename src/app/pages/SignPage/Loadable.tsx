/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const SignPage = lazyLoad(
  () => import('./index'),
  module => module.SignPage,
);
