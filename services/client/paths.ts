export default {
  home: "/",
  signin: "/signin",
  signup: "/signup",
  basket: "/basket",
  request: "/signin/request",
  dashboard: "/dashboard",
  search: "/search",

  // paths can be functions for dynamic routes
  user(username: string) {
    return {
      href: "/[username]",
      as: `/${username}`
    };
  },
  egg(eggname: string) {
    return {
      href: "/egg/[eggname]",
      as: `/egg/${eggname}`
    };
  },
  eggWorkshop(eggname: string) {
    return {
      href: "/egg/[eggname]/workshop",
      as: `/egg/${eggname}/workshop`
    };
  }
};
