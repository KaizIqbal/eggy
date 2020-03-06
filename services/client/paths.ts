export default {
  home: "/",
  signin: "/signin",
  signup: "/signup",
  basket: "/basket",
  request: "/signin/request",
  dashboard: "/dashboard",
  search: "/s",

  // paths can be functions for dynamic routes
  user(username: string) {
    return {
      href: "/[username]",
      as: `/${username}`
    };
  },
  egg(eggname: string) {
    return {
      href: "/e/[eggname]",
      as: `/e/${eggname}`
    };
  },
  eggWorkshops(eggname: string) {
    return {
      href: "/e/[eggname]/workshop",
      as: `/e/${eggname}/workshop`
    };
  }
};
