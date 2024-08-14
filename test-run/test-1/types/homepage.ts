// [ *************************** ]
// Homepage response type, what you should get when calling /homepage
// [ *************************** ]

import type { Component, LastEditedBy, CommonPageFields } from './common';

export interface HomepageResponse extends CommonPageFields {
  components: Component[];
  customUrl: {
    en: string;
  };
  last_edited_by: LastEditedBy;
  status: 'published' | 'draft';
}
