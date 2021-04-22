module.exports = {
<<<<<<< HEAD
	devServer: {
		proxy: {
			'/api': {
				target: 'http://121.41.94.85:5000/',
				/*pathRewrite: {
				  '^/api': '/'
				}*/
			}
		},
	}
=======
  devServer: {
    proxy: {
	  '/api': {
	    target: 'http://121.41.94.85:5000/',
	  },
	  '/static': {
	    target: './',
	  }
    },
  }
>>>>>>> origin/main
}