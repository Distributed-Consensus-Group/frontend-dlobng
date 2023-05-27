module.exports = {
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
			{
				test: /QRCodeModal\/styles.css$/i,
				use: ["css-loader"],
			},
		],
	},
	node: {
		global: true,
		__filename: true,
		__dirname: true,
	}
};
