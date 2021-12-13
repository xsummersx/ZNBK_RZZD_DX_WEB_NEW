/*
 * @Author: your name
 * @Date: 2020-12-03 15:31:36
 * @LastEditTime: 2021-12-02 15:19:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \znbk_zntfd_zx_web\vue.config.js
 */
const webpack = require("webpack");
const path = require("path"); //引入path模块
function resolve(dir) {
	return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
	filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"windows.jQuery": "jquery",
			}),
		],
	},
	chainWebpack: (config) => {
		config.resolve.alias.set("@", resolve("./src"));
	},
	productionSourceMap: false,
	publicPath: "./",
	outputDir: "Web", // 输出文件目录,
	devServer: {
		host: "localhost",
		port: 8080,
		proxy: {
			//本地调试使用
			"/api": {
				// 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
				target: "http://172.16.41.237:12072/api",
				// target: 'http://172.16.41.231:16061/api',
				// target: "http://172.16.41.237:12061/api",
				// target: 'http://172.16.41.125:9981/mock/27/api',
				// 允许跨域
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	},
};
