import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from 'vuetify/labs/VDataTable';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VStepperVertical } from 'vuetify/labs/VStepperVertical';

export default createVuetify({
  components: {
    ...components,
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
    VStepperVertical,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
