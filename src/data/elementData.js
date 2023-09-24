import bCancerJSON from './Breast_Cancer_Awareness_Month.json';
import halloweenJSON from './Halloween.json';
import hostJSON from './Høst.json';
import oktoberFestJSON from './Oktoberfest.json';

const topics = [
  {
    id: 'breastCancerAwarenessBtn',
    name: 'Breast Cancer Awareness',
    words: bCancerJSON.ord,
    color: 'rgb(31, 144, 197)',
  },
  {
    id: 'halloweenBtn',
    name: 'Halloween',
    words: halloweenJSON.ord,
    color: 'rgb(178, 31, 197)',
  },
  {
    id: 'høstBtn',
    name: 'Høst',
    words: hostJSON.ord,
    color: 'rgb(221, 95, 22)',
  },
  {
    id: 'oktoberFestBtn',
    name: 'Oktober Fest',
    words: oktoberFestJSON.ord,
    color: 'rgb(59, 48, 216)',
  },
];

export default topics;
