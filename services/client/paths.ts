export default {
  home: "/",
  signin: "/signin",
  signup: "/signup",
  basket: "/basket",
  request: "/signin/request",
  dashboard: "/dashboard",

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
  }
};
