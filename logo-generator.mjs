//Imports entire module
import fs from 'fs/promises';
import inquirer from 'inquirer';
import SVGBuilder from 'svg-builder'; 

async function generateSVG(text, textColor, shape, shapeColor) {
  const svg = SVGBuilder(); 
  const content = svg
    .size(300, 200) //Sets size of SVG
    .style('background-color', '#FFFFFF'); //Sets the background color

  content.text(150, 120, text).attr('fill', textColor).attr('text-anchor', 'middle');

  return svg.toString();
}

(async () => {
  try {
    const answers = await inquirer.prompt([
      {
        name: 'text',
        message: 'Enter characters for logo',
      },
      {
        name: 'textColor',
        message: 'Enter color for the text',
      },
      {
        name: 'shape',
        type: 'list',
        message: 'Choose a shape for the logo:',
        choices: ['triangle', 'circle', 'square', 'hexagon'],
      },
      {
        name: 'shapeColor',
        message: 'Enter the color you would like your shape to be',
      },
    ]);

    const svgContent = await generateSVG(
      answers.text,
      answers.textColor,
      answers.shape,
      answers.shapeColor
    );

    await fs.writeFile('logo.svg', svgContent);
    console.log('Generated logo.svg');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
