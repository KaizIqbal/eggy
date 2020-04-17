import * as fs from "fs";

function readFiles(dirname:string, onFileContent:any, onError:any) {
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(filename => {
      fs.readFile(dirname + filename, "utf-8", function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

export { readFiles };
