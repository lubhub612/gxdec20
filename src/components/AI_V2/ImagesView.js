import React from "react";

function findBestFit(rectangles, width, height) {
  let bestFit = null;
  let bestFitArea = Infinity;

  for (const rectangle of rectangles) {
    const rectWidth = rectangle.width;
    const rectHeight = rectangle.height;

    if (rectWidth <= width && rectHeight <= height) {
      const area = width * height - rectWidth * rectHeight;

      if (area < bestFitArea) {
        bestFit = rectangle;
        bestFitArea = area;
      }
    }
  }

  return bestFit;
}

function arrangeImagesInColumns(images, numColumns) {
  const columns = Array.from({ length: numColumns }, () => []);

  for (const image of images) {
    const [width, height] = image.value.split("x").map(Number);
    const bestColumn = columns.reduce((prev, curr) =>
      prev.height <= curr.height ? prev : curr
    );
    const bestFit = findBestFit(bestColumn, width, height);

    if (bestFit) {
      bestColumn.push({
        width,
        height,
        image,
      });
    } else {
      const newColumn = [];
      newColumn.push({
        width,
        height,
        image,
      });
      columns.push(newColumn);
    }
  }

  return columns;
}

function ImageGrid({ images, numColumns }) {
  const columns = arrangeImagesInColumns(images, numColumns);

  return (
    <div className="image-grid">
      {columns.map((column, index) => (
        <div key={index} className="column">
          {column.map((item, itemIndex) => (
            <div key={itemIndex} className="image-container">
              <img src={item.image.image_url} alt="Model Image" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
