import { ComponentType, ReactElement, ReactNode } from 'react';

import { NextPage } from 'next';

export type NextPageWithLayout<P = Record<string, never>> = NextPage<P> & {
  getLayout?: (_page: ReactElement) => ReactNode;
  layout?: ComponentType;
};