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
    darkColor: 'rgb(39, 47, 52)'
  },
  {
    id: 'halloweenBtn',
    name: 'Halloween',
    words: halloweenJSON.ord,
    color: 'rgb(166, 12, 146)',
    darkColor: 'rgb(50, 42, 49)',
  },
  {
    id: 'høstBtn',
    name: 'Høst',
    words: hostJSON.ord,
    color: 'rgb(221, 95, 22)',
    darkColor: 'rgb(42, 37, 34)',
  },
  {
    id: 'oktoberFestBtn',
    name: 'Oktober Fest',
    words: oktoberFestJSON.ord,
    color: 'rgb(59, 48, 216)',
    darkColor: 'rgb(46, 44, 68)',
  },
];

export default topics;
