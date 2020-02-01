function verifyUserName(args: any) {
  // checking..
  var regex = /^\w+$/;
  if (!regex.test(args.username)) {
    throw new Error("username is Invalid");
  }
  // add @ in beginning of username
  args.username = "@" + args.username;
}

exports.verifyUserName = verifyUserName;
