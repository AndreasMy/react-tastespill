import bCancerJSON from "./Breast_Cancer_Awareness_Month.json";
import halloweenJSON from "./Halloween.json";
import hostJSON from "./Høst.json";
import oktoberFestJSON from "./Oktoberfest.json";


const themes = [
  {
    id: "breastCancerAwarenessBtn",
    name: "Breast Cancer Awareness",
    words: bCancerJSON.ord,
  },
  {
    id: "halloweenBtn",
    name: "Halloween",
    words: halloweenJSON.ord,
  },
  {
    id: "høstBtn",
    name: "Høst",
    words: hostJSON.ord,
  },
  {
    id: "oktoberFestBtn",
    name: "Oktober Fest",
    words: oktoberFestJSON.ord,
  },
];

export default themes;
