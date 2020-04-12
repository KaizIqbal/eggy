function verifyUserName(args: any) {
  // checking..
  var regex = /^\w+$/;
  if (!regex.test(args.username)) {
    throw new Error(
      "username is Invalid \n Only Characters and `undescore(_)` allowed"
    );
  }
  // add @ in beginning of username
  args.username = "@" + args.username;
}

export default verifyUserName;
