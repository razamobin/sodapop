
      var allCircles = [];
      //console.log('bbq');
var colors = [
            // night theme
            ["f72585", "b5179e", "7209b7", "560bad", "480ca8", "3a0ca3", "3f37c9", "4361ee", "4895ef", "4cc9f0"],

            // pastel theme
            ["54478c", "2c699a", "048ba8", "0db39e", "16db93", "83e377", "b9e769", "efea5a", "f1c453", "f29e4c"],

            // purple orange nice. great contrast
            //["ff6d00", "ff7900", "ff8500", "ff9100", "ff9e00", "240046", "3c096c", "5a189a", "7b2cbf", "9d4edd"],

            // intense black orange fire amazing
            [/*"03071e"*/, /*"370617"*/, "6a040f", "9d0208", "d00000", "dc2f02", "e85d04", "f48c06", "faa307", "ffba08"],

            // blue and yellow for kait
            ["00296b", "003f88", "00509d", "fdc500", "ffd500"],

            // amazing artsy modern vibe
            [/*"001219"*/, /*"005f73"*/, "0a9396", "94d2bd", "e9d8a6", "ee9b00", "ca6702", "bb3e03", "ae2012", "9b2226"],

            // kinda cool, white is distracting though?
            //[/*"0a1128"*/, "001f54", "034078", "1282a2", "fffeea"],

            // blue gradient lovely
            ["03045e", "023e8a", "0077b6", "0096c7", "00b4d8", "48cae4", "90e0ef", "ade8f4", "caf0f8"],

            // pink gradient lovely
            ["590d22", "800f2f", "a4133c", "c9184a", "ff4d6d", "ff758f", "ff8fa3", "ffb3c1", "ffccd5", "fff0f3"],

            // purple gradient lovely
            //[/*"10002b",*/ "240046", "3c096c", "5a189a", "7b2cbf", "9d4edd", "c77dff", "e0aaff"],

            // clean greens
            ["d9ed92", "b5e48c", "99d98c", "76c893", "52b69a", "34a0a4", "168aad", "1a759f", "1e6091", "184e77"],

            // darker blues reds
            //["b7094c", "a01a58", "892b64", "723c70", "5c4d7d", "455e89", "2e6f95", "1780a1", "0091ad"],

            // 5 teals
            //["07beb8", "3dccc7", "68d8d6", "9ceaef", "c4fff9"],

            //["ff0072", "ff177f", "ff2e8c", "ff4598", "ff5ca5", "ff74b2", "ff8bbf", "ffa2cb", "ffb9d8", "ffd0e5"],

            //
            //["08d7d0", "09f0e9", "1df7f0", "36f8f1", "4ff9f3", "68f9f5", "81faf6", "9afbf8", "b4fcfa", "cdfdfc"],




            // neon tokyo
            ["00214A", "0D3F7C", "04BBEC", "FF82F4", "EA25B5"]



  ];

function rb(a, b) {
    return a + (b - a) * fxrand();
}
var paletteIndex = Math.floor(rb(0, colors.length));


let r;

function randomColor() {
  //console.log('p index: ' + paletteIndex);
  let r2 = int(rb(0, colors[paletteIndex].length));
  return ('#' + colors[paletteIndex][r2]);
}


// will make this relative to size in setup()

// variables
  // colors + b&w
  // number of diff sizes, and what those sizes are
  // do the packing out of order, make the lower ones follow a flow field, then add others in. could make for an interesting visual
  // padding
  // add the draw triangles thing to this? make the circles out of arbitrary triangles? w subdivisions. colors for each sub?
  // soft paint brush look for each circle?



function setup() {


  var h = window.innerHeight;
  var w = (4*h/6);

  // flip it if window is narrow width
  if (window.innerWidth < w) {
    w = window.innerWidth;
    h = 6*w/4;
  }

  // [[150,1], [60,6], [30,30], [10,100], [8,200], [4,200], [3,100]];
  //console.log('width: ' + w); // 527
  //console.log('height: ' + h); // 791

  createCanvas(w, h);

  //var smalldim =  Math.floor(Math.min(w, h));
  //console.log('small dim: ' + smalldim);
  //  I ve had to fuss with that on other projects too. Basically limit the canvas size slightly by a modulo of window size.
  // I tend to work in proportions, so dividing by 2, 4, 10, etc.

  //var padding = 4;
  var padding = w/(565/4.0);
  //console.log('padding ' + padding);
  //var padding = random(0,10); // make this variable. looks good 0 10 40 etc


  // TODO: make circle radii relative
  //var circles = [[150,1], [60,6], [30,30], [10,100], [8,200], [4,200], [3,100]];
  //var circles = [[150,1], [60,6], [30,30], [10,100], [4,200]];
  let cc1 = w/(565/150.0);
  let cc2 = w/(565/60.0);
  let cc3 = w/(565/30.0);
  let cc4 = w/(565/10.0);
  let cc5 = w/(565/8.0);
  let cc6 = w/(565/4.0);
  let cc7 = w/(565/3.0);
  //console.log(cc1);
  //console.log(cc2);
  //console.log(cc3);
  //console.log(cc4);
  //console.log(cc5);
  //console.log(cc6);
  //console.log(cc7);
  var circles = [[cc1,1], [cc2,6], [cc3,30], [cc4,100], [cc5,200], [cc6,200], [cc7,100]];

  ///outer is 10
  let outer = w / (565/10.0);
  let maxTries = 400;

  background(0);

  noFill();
  noStroke();


  // for each circle size
  for (var i = 0; i < circles.length; i++) {
    //
    var c = circles[i];

    var radius = c[0];
    var numCircles = c[1];

    // draw the number of circles. but eventually you might run out of tries so give end this loop early if you try 2000 times and can't get it to fit :)
    for (var j = 0; j < 100; j++) {

      var tries = 0;
      while (true) {
        if (tries > maxTries) {
          break;
        }
        // choose random point
        //var rx = random(0+radius+outer, w-radius-outer);
        //var ry = random(0+radius+outer, h-radius-outer);
        var rx = rb(0+radius+outer, w-radius-outer);
        var ry = rb(0+radius+outer, h-radius-outer);

        var collision = collidingWithAny([rx, ry, radius], padding);
        if (collision) {
          tries++;
          continue;
        } else {
          fill(randomColor());
          circle(rx, ry, radius*1.96);
          allCircles.push([rx, ry, radius]);
          break;
        }

      }
    }
  }
}


function collidingWithAny(c1, padding) {
  if (allCircles.length === 0) {
    return false;
  }
  for (var i = 0; i < allCircles.length; i++) {
    if (colliding(c1, allCircles[i], padding)) {
      return true;
    }
  }
  return false;
}

function colliding(c1, c2, padding) {
  var x1 = c1[0];
  var y1 = c1[1];
  var r1 = c1[2];
  var x2 = c2[0];
  var y2 = c2[1];
  var r2 = c2[2];

  var distance = sqrt(pow((x2-x1), 2) + pow((y2-y1), 2));
  //console.log(distance);
  return (distance) < (padding+r1+r2);
}


function windowResized() {
    clear();
    //console.log(windowWidth);
    //console.log(windowHeight);

      fxrand = sfc32(...hashes)
      allCircles = [];
      paletteIndex = Math.floor(rb(0, colors.length));

    setup();
}

