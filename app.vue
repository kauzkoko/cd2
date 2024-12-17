<template>
  <div class="outer-landscape" v-if="landscapeMobile">
    <div class="container">
      <!-- <div id="p5image"></div> -->
      <template v-for="block in data?.contents">
        <img v-if="block.image" :src="block.image.display.url" />
      </template>
      <!-- <div id="sketch1"></div> -->
    </div>
  </div>
  <div class="outer" v-else>
    <div class="container">
      <!-- <div id="p5image"></div> -->
      <template v-for="block in data?.contents">
        <img v-if="block.image" :src="block.image.display.url" />
      </template>
      <!-- <div id="sketch1"></div> -->
    </div>
  </div>
</template>

<script setup>
const { width, height } = useWindowSize();
const landscapeMobile = computed(() => width.value / height.value > 1.7 && width.value < 1024);

const { data } = await useFetch(
  "https://api.are.na/v2/channels/artworks-i-took-a-picture-of"
);

// console.log(data.value.contents[0].image.display.url);
// const image = useP5((p5) => {
//   let displaceColors;
//   let img;

//   const displaceColorsSrc = `
//     precision highp float;
    
//     uniform sampler2D tex0;
//     varying vec2 vTexCoord;
    
//     vec2 zoom(vec2 coord, float amount) {
//       vec2 relativeToCenter = coord - 0.5;
//       relativeToCenter /= amount; // Zoom in
//       return relativeToCenter + 0.5; // Put back into absolute coordinates
//     }
    
//     void main() {
//       gl_FragColor = vec4(
//         texture2D(tex0, vTexCoord).r,
//         texture2D(tex0, zoom(vTexCoord, 1.05)).g,
//         texture2D(tex0, zoom(vTexCoord, 1.1)).b,
//         texture2D(tex0, vTexCoord).a
//       );
//     }
//   `;

//   p5.preload = () => {
//     img = p5.loadImage(data.value.contents[0].image.display.url);
//   }

//   p5.setup = () => {
//     let canvas = p5.createCanvas(800, 600, p5.WEBGL);
//     canvas.parent("p5image");
//     displaceColors = p5.createFilterShader(displaceColorsSrc);
//   };

//   p5.draw = () => {
//     p5.background(255);
//     p5.push();
//     p5.imageMode(p5.CENTER);
//     p5.image(img, 0, 0, 800, 600);
//     p5.pop();
//     p5.filter(displaceColors);
//   };
// });

// const sketch1 = useP5((p5) => {
//   let heads = [];
//   let motion = false;
//   let backgroundColor = 255;

//   class Dude {
//     constructor(x = 0, y = 0) {
//       this.x = x;
//       this.y = y;
//     }

//     debug() {
//       let safeMouseX = p5.constrain(p5.mouseX, 0, 400);
//       console.log(safeMouseX);
//     }

//     display() {
//       let safeMouseX = p5.constrain(p5.mouseX, 0, p5.width);
//       let safeMouseY;
//       if (motion && typeof p5.rotationY !== "undefined") {
//         // Map rotation to Y position, assuming rotation range of -90 to 90 degrees
//         safeMouseY = p5.map(p5.rotationY, -90, 90, 0, p5.height);
//       } else {
//         safeMouseY = p5.constrain(p5.mouseY, 0, p5.height);
//       }
//       p5.push();
//       p5.strokeWeight(7);
//       p5.rectMode(p5.CENTER);
//       p5.translate(this.x - 25, this.y - 25);
//       p5.scale(1 / 6);

//       //head
//       p5.fill(
//         p5.map(safeMouseX, 0, p5.width, 255, 0),
//         p5.map(safeMouseY, 0, p5.height, 255, 0),
//         0
//       );
//       p5.ellipse(p5.width / 2, p5.height / 2, p5.width, p5.height);

//       //left eye
//       p5.fill(0);
//       p5.rect(p5.width / 4, p5.map(safeMouseX, 0, p5.width, 100, 60), 50);
//       p5.fill(255);
//       p5.ellipse(p5.width / 4, p5.map(safeMouseX, 0, p5.width, 50, 10), 50);
//       p5.fill(0);
//       p5.ellipse(p5.width / 4, p5.map(safeMouseX, 0, p5.width, 50, 20), 20);

//       p5.rect((p5.width / 4) * 3, 100, 50);
//       p5.fill(255);
//       p5.ellipse((p5.width / 4) * 3, 75, 75);
//       p5.fill(0);
//       p5.ellipse(
//         (p5.width / 4) * 3,
//         70,
//         p5.map(safeMouseX, 0, p5.width, 50, 20)
//       );

//       p5.noFill();
//       p5.bezier(
//         (p5.width / 8) * 3,
//         (p5.height / 8) * 3,
//         p5.width / 16,
//         p5.height / p5.map(safeMouseX, 0, p5.width, 16, 8),
//         p5.width / p5.map(safeMouseX, 0, p5.width, 16, 8),
//         p5.height / p5.map(safeMouseX, 0, p5.width, 1, 2),
//         p5.width / 2,
//         (p5.height / 8) * 3
//       );

//       p5.fill(0);
//       p5.rect(
//         p5.width / 2,
//         (p5.height / 4) * p5.map(safeMouseX, 0, p5.width, 3, 2),
//         300,
//         50
//       );
//       p5.fill(255);
//       p5.rect(
//         p5.width / 2,
//         (p5.height / 4) * p5.map(safeMouseX, 0, p5.width, 3, 2.5) - 10,
//         250,
//         20
//       );
//       p5.pop();
//     }
//   }

//   p5.setup = () => {
//     let canvas = p5.createCanvas(400, 400);
//     canvas.parent("sketch1");

//     // canvas.parent("sketch1");
//     for (let stepper = 10; stepper > 0; stepper--) {
//       for (let xIndex = 1; xIndex < stepper; xIndex++) {
//         for (let yIndex = 1; yIndex < stepper; yIndex++) {
//           heads.push(
//             new Dude(
//               (xIndex * p5.width) / stepper,
//               (yIndex * p5.height) / stepper
//             )
//           );
//         }
//       }
//     }

//     if (typeof DeviceMotionEvent.requestPermission === "function") {
//       document.body.addEventListener("click", function () {
//         DeviceMotionEvent.requestPermission()
//           .then(function () {
//             console.log("DeviceMotionEvent enabled");

//             motion = true;
//           })
//           .catch(function (error) {
//             console.warn("DeviceMotionEvent not enabled", error);
//           });
//       });
//     }
//   };

//   p5.draw = () => {
//     p5.background(backgroundColor);
//     p5.push();
//     p5.translate(-10, -10);
//     heads.forEach((head) => head.display());
//     p5.pop();
//   };

//   p5.windowResized = () => {
//     if (p5.windowWidth > 768) {
//       backgroundColor = [255, 0, 0];
//     } else {
//       backgroundColor = [255];
//     }
//   };
// });
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.outer {
  width: 100vw;
  display: flex;
  justify-content: center;

  .container {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
    }

    @media (min-width: 1660px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    img {
      width: 90vw;
      height: 500px;
      object-fit: cover;
      overflow: hidden;

      @media (max-width: 1024px) {
        margin: 10px;
      }
    }


  }
}

.outer-landscape {
  display: flex;
  flex-direction: row;
  height: 100dvh;
  align-items: center;
  overflow-y: hidden;

  .container {
    display: flex;
    flex-direction: row;
    padding: 20px;
    overflow-y: hidden;

    img {
      margin-right: 20px;
      width: 90vw;
      height: 90vh;
      object-fit: cover;
    }
  }
}
</style>
