import type { FlowDSL } from '../src/types';
import { entryTrack, action, fire } from './_patterns';

export default {
  "Vision Flow": {
    tracks: [
      entryTrack([
        action("Describe Doc Images", { label: "describe images" }),
        fire("vision.complete", { label: "done" }),
      ]),
    ],
  },
} satisfies FlowDSL;
