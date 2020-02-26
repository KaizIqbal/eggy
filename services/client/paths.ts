export default {
  home: "/",
  signin: "/signin",
  signup: "/signup",
  basket: "/basket",

  // paths can be functions for dynamic routes
  user(username: string) {
    return {
      href: "/[user]",
      as: `/${username}`
    };
  },
  egg(username: string, eggname: string) {
    return {
      href: "/[user]/[egg]/workshop",
      as: `/${username}/${eggname}/workshop`
    };
  },
  eggUpdate(username: string, eggname: string) {
    return {
      href: "/[user]/[egg]/workshop",
      as: `/${username}/${eggname}/workshop`
    };
  }
};
