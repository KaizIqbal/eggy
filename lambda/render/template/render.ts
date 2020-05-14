export const template = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Eggy Render Template</title>
        <style>
            svg {width: 50%;height: 50%;}
        </style>
    </head>
                
    <body>
        <div id="container">

            <!-- .svg file injected on <svg> tag -->

            <svginjection>

        </div>
    </body>
</html>
`;

export const generateRenderTemplate = (svg: string) =>
  template.replace("<svginjection>", svg);
