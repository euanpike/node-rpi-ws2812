console.log('Server-side code running');

const express = require('express');
var ws281x = require('ws281x-pi4');

class Example {

    constructor() {
        this.config = {};

        this.offset = 0;

        // Number of leds in my strip
        this.config.leds = 120;

        // Use DMA 10 (default 10)
        this.config.dma = 10;

        // Set full brightness, a value from 0 to 255 (default 255)
        this.config.brightness = 255;

        // Set the GPIO number to communicate with the Neopixel strip (default 18)
        this.config.gpio = 18;

        // The RGB sequence may vary on some strips. Valid values
        // are "rgb", "rbg", "grb", "gbr", "bgr", "brg".
        // Default is "rgb".
        // RGBW strips are not currently supported.
        this.config.stripType = 'grb';

        // Configure ws281x
        ws281x.configure(this.config);
    }

    red() {
        // Create a pixel array matching the number of leds.
        // This must be an instance of Uint32Array.
        var pixels = new Uint32Array(this.config.leds);

        // Create a fill color with red/green/blue.
        var red = 255, green = 0, blue = 0;
        var color = (red << 16) | (green << 8)| blue;

        for (var i = 0; i < this.config.leds; i++)
            pixels[i] = color;

        // Render to strip
        ws281x.render(pixels);
    }
    green() {
        // Create a pixel array matching the number of leds.
        // This must be an instance of Uint32Array.
        var pixels = new Uint32Array(this.config.leds);

        // Create a fill color with red/green/blue.
        var red = 0, green = 255, blue = 0;
        var color = (red << 16) | (green << 8)| blue;

        for (var i = 0; i < this.config.leds; i++)
            pixels[i] = color;

        // Render to strip
        ws281x.render(pixels);
    }
    blue() {
        // Create a pixel array matching the number of leds.
        // This must be an instance of Uint32Array.
        var pixels = new Uint32Array(this.config.leds);

        // Create a fill color with red/green/blue.
        var red = 0, green = 0, blue = 255;
        var color = (red << 16) | (green << 8)| blue;

        for (var i = 0; i < this.config.leds; i++)
            pixels[i] = color;

        // Render to strip
        ws281x.render(pixels);
    }

    loop() {
        var pixels = new Uint32Array(this.config.leds);

        pixels[this.offset] = 0xFFFFFF;
        this.offset = (this.offset + 1) % this.config.leds;
        ws281x.render(pixels);
    }

    run() {
        setInterval(this.loop.bind(this), 100);
    }
    
};

var example = new Example();

const app = express();

// serve files from the public directory
app.use(express.static('public'));

// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/clicked', (req, res) => {
    console.log('changed led');
    example.red();
    res.sendStatus(201)
})

app.post('/green', (req, res) => {
    console.log('changed led');
    example.green();
    res.sendStatus(201)
})

app.post('/blue', (req, res) => {
    console.log('changed led');
    example.blue();
    res.sendStatus(201);
})

app.post('/chaser', (req, res) => {
    console.log('started chaser');
    example.run();
    res.sendStatus(204);
}) 