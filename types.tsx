import { DetailedStatsProps } from "./screens/DetailedStats";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type HomeParamList = {
  Home: undefined;
  DetailedStats: DetailedStatsProps;
};

export type ChatParamList = {
  Chat: undefined;
};

export type ProfileParamList = {
  Profile: undefined;
};

