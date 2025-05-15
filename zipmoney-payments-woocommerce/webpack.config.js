// Load the default @wordpress/scripts config object
const defaultConfig                                = require( '@wordpress/scripts/config/webpack.config' );
const WooCommerceDependencyExtractionWebpackPlugin = require( '@woocommerce/dependency-extraction-webpack-plugin' );

// Use the defaultConfig but replace the entry and output properties
module.exports = {
	...defaultConfig,
	entry: {
		index: './client/blocks/index.js',
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/build',
	},
	plugins: [ new WooCommerceDependencyExtractionWebpackPlugin( '@woocommerce/blocks-registry' ) ],
};
