import { RoutesPath } from "@core/constants/routes.const";

export const NAVIGATION = [
  {
    link: `/${RoutesPath.HOME}`,
    icon: "home",
    name: "HOME"
  },
  {
    link: `/${RoutesPath.HOME}/${RoutesPath.RECOMMENDATIONS}`,
    icon: "favorite",
    name: "FIND A MATCH"
  },
  {
    link: `/${RoutesPath.HOME}/${RoutesPath.MATCHES}`,
    icon: "diversity_1",
    name: "YOUR MATCHES"
  },
  {
    link: `/${RoutesPath.HOME}/${RoutesPath.TEAM}`,
    icon: "group",
    name: "YOUR TEAM"
  },
  {
    link: `/${RoutesPath.HOME}/${RoutesPath.CALENDAR}`,
    icon: "calendar_month",
    name: "YOUR CALENDAR"
  }
];
