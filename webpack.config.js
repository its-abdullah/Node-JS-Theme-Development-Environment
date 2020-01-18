var path = require('path');

module.exports = {
    entry: ["./dependencies.js"],
    output: {
        filename: "bundle.js"
    },
    // devtool:'eval',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
						loader: 'file-loader',
						options: {
							name: 'bundle.css',
						}
                    },
                    {
						loader: 'extract-loader'
					},
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader' //we might need, boostrap somehow has its own
                    },
                    {
                        loader: 'sass-loader'
                    }
				]
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
						loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    // plugins: [
    //     require('autoprefixer')
    // ]
}