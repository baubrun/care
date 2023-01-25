import { lazy } from "react";

export const HOME_PAGE = {
  path: "/",
  render: lazy(() => import("../../components/patient/WaitingRoom")),
};

export const PAGES = [HOME_PAGE];
