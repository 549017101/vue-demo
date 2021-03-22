/**
  Author: pxz
  Email: buffll@foxmail.com
  2021-03-22 21:30
 */
module.exports={
	configureWebpack: {
		resolve: {
			//配置路径别名
			alias:{
				// '@'就表示src目录,这是默认配置的
				//在脚手架2中,不支持 @/assets 但是在脚手架3中支持
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
			}
		}
	}
}
