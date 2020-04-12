import * as shortid from "shortid";

function generateEggName(args: any) {
  // generating "eggname" fron "title" and attach to the "args"

  // 1 => remove all special character expect white space
  // 2 => replace white spaces with "-"
  // 3 => generate id and add to end with prefix `-`

  args.eggname = args.title.replace(/[^a-zA-Z0-9 ]/g, "");
  args.eggname = args.eggname.replace(/\s/g, "-");
  args.eggname = args.eggname + "-" + shortid.generate();
}

export default generateEggName;
