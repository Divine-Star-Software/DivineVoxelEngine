export type BuiltInReverbList =
  | "Vaneev/Block Inside"
  | "Vaneev/Bottle Hall"
  | "Vaneev/Cement Blocks 1"
  | "Vaneev/Cement Blocks 2"
  | "Vaneev/Chateau de Logne, Outside"
  | "Vaneev/Conic Long Echo Hall"
  | "Vaneev/Deep Space"
  | "Vaneev/Derlon Sanctuary"
  | "Vaneev/Direct Cabinet N1"
  | "Vaneev/Direct Cabinet N2"
  | "Vaneev/Direct Cabinet N3"
  | "Vaneev/Direct Cabinet N4"
  | "Vaneev/Five Columns Long"
  | "Vaneev/Five Columns"
  | "Vaneev/French 18th Century Salon"
  | "Vaneev/Going Home"
  | "Vaneev/Greek 7 Echo Hall"
  | "Vaneev/Highly Damped Large Room"
  | "Vaneev/In The Silo Revised"
  | "Vaneev/In The Silo"
  | "Vaneev/Large Bottle Hall"
  | "Vaneev/Large Long Echo Hall"
  | "Vaneev/Large Wide Echo Hall"
  | "Vaneev/Masonic Lodge"
  | "Vaneev/Musikvereinsaal"
  | "Vaneev/Narrow Bumpy Space"
  | "Vaneev/Nice Drum Room"
  | "Vaneev/On a Star"
  | "Vaneev/Parking Garage"
  | "Vaneev/Rays"
  | "Vaneev/Right Glass Triangle"
  | "Vaneev/Ruby Room"
  | "Vaneev/Scala Milan Opera Hall"
  | "Vaneev/Small Drum Room"
  | "Vaneev/Small Prehistoric Cave"
  | "Vaneev/St Nicolaes Church"
  | "Vaneev/Trig Room"
  | "Vaneev/Vocal Duo";

export type EffectData = {
  reverb?: {
    builtIn?: BuiltInReverbList;
    custom?: string;
    level: number;
  };
  delay?: {
    time: number;
  };
  filter?: {};
};
