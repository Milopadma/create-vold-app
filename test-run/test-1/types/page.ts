// [ *************************** ]
// Page response type, what you should get when calling /page
// [ *************************** ]
import type { CommonPageFields } from './common';

export type Page = CommonPageFields;

export interface PageResponse {
  is_last: boolean;
  results: Page[];
  total: number;
  total_page: number;
}
