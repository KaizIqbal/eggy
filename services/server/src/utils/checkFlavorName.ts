function checkFlavorName(args: any) {
  var regex = /^[a-zA-Z]+$/;
  if (!regex.test(args.name)) {
    throw new Error("Flavor name is Invalid \n Spacial Characters not allowed");
  }
}

export default checkFlavorName;
