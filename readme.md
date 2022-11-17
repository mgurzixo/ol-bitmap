# Create an OpenLayers feature from a memory bitmap obtained from bundling a PNG on the browser.

See corresponding [stackoverflow](https://stackoverflow.com/questions/74450845/openlayers-how-to-create-a-feature-icon-from-a-memory-bitmap) question.

This example uses [Vite](https://vitejs.dev/), OpenLayers and a vite plugin for importing raw data.

To start a development server (available at http://localhost:5173):

    cd ol-bitmap
    npm start

To generate a build ready for production:

    npm run build

Then deploy the contents of the `dist` directory to your server.  You can also run `npm run serve` to serve the results of the `dist` directory for preview.
