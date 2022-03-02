import { RouteProps } from "react-router-dom";
import { CountriesContainer, CountryInfo } from "../../views";

export function getRoutes() {
  const routes: RouteProps[] = [
    {
      path: "/home",
      component: CountriesContainer,
    },
    {
      path: "/country/:countryName",
      component: CountryInfo,
    },
  ];
  return routes;
}
