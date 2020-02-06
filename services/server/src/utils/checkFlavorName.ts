function checkFlavorName(args: any) {
  var regex = /^[a-zA-Z]+$/;
  if (!regex.test(args.name)) {
    throw new Error("flavour name is Invalid");
  }
}

exports.checkFlavorName = checkFlavorName;
