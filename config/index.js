// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',  // 网络资源的访问，即在哪一个目录下
    // assetsPublicPath: 'http://112.74.190.114/', 
    // assetsPublicPath: 'http://123.134.33.54:65534', 
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  dev: {
    env: require('./dev.env'),
    port: 8000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/api": {
        "target": "http://112.74.190.114",
        "changeOrigin": true
      },
      "/charger-LAB-Web": {
        "target": "http://112.74.190.114",
        "changeOrigin": true
      },
      "/charger-APS-Web": {
        "target": "http://112.74.190.114",
        "changeOrigin": true
      },
      "/charger-SCH-Web": {
        "target": "http://112.74.190.114",
        "changeOrigin": true
      },
      "/charger-HR-Web": {
        "target": "http://112.74.190.114",
        "changeOrigin": true
      },
      "/charger-ACC-Web": {
        "target": "http://112.74.190.114",
        "changeOrigin": true
      },
      "/charger-SPC-Web": {
        "target": "http://112.74.190.114",
        "changeOrigin": true
      }
    },


    //刘会雄
    // proxyTable: {
    //   "/api": {
    //     "target": "http://192.168.1.109:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   },
    //   "/charger-LAB-Web": {
    //     "target": "http://192.168.1.109:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-LAB-Web': ''
    //     }
    //   },
    //   "/charger-APS-Web": {
    //     "target": "http://192.168.1.109:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-APS-Web': ''
    //     }
    //   },
    //   "/charger-SCH-Web": {
    //     "target": "http://192.168.1.109:8094",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-SCH-Web': ''
    //     }
    //   },
    //   "/charger-SYS-Web": {
    //     "target": "http://192.168.1.109:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-SYS-Web': ''
    //     }
    //   },
    //   "/charger-HR-Web": {
    //     "target": "http://192.168.1.109:9000",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-HR-Web': ''
    //     }
    //   }
    // },

    // 李乐凯
    // proxyTable: {
    //   "/api": {
    //     "target": "http://192.168.1.105:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   },
    //   "/charger-LAB-Web": {
    //     "target": "http://192.168.1.105:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-LAB-Web': ''
    //     }
    //   },
    //   "/charger-APS-Web": {
    //     "target": "http://192.168.1.105:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-APS-Web': ''
    //     }
    //   },
    //   "/charger-SCH-Web": {
    //     "target": "http://192.168.1.105:8094",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-SCH-Web': ''
    //     }
    //   },
    //   "/charger-SYS-Web": {
    //     "target": "http://192.168.1.105:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-SYS-Web': ''
    //     }
    //   },
    //   "/charger-HR-Web": {
    //     "target": "http://192.168.1.105:9000",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-HR-Web': ''
    //     }
    //   }
    // },

//王壮
    // proxyTable: {
    //   "/api": {
    //     "target": "http://192.168.1.108:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   },
    //   "/charger-LAB-Web": {
    //     "target": "http://192.168.1.108:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-LAB-Web': ''
    //     }
    //   },
    //   "/charger-APS-Web": {
    //     "target": "http://192.168.1.108:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-APS-Web': ''
    //     }
    //   },
    //   "/charger-SCH-Web": {
    //     "target": "http://192.168.1.108:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-SCH-Web': ''
    //     }
    //   },
    //   "/charger-SYS-Web": {
    //     "target": "http://192.168.1.108:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-SYS-Web': ''
    //     }
    //   },
    //   "/charger-HR-Web": {
    //     "target": "http://192.168.1.108:9000",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-HR-Web': ''
    //     }
    //   }
    // },


    //刘忠伟
    // proxyTable: {
    //   "/api": {
    //     "target": "http://192.168.1.120:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   },
    //   "/charger-LAB-Web": {
    //     "target": "http://192.168.1.120:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-LAB-Web': ''
    //     }
    //   },
    //   "/charger-APS-Web": {
    //     "target": "http://192.168.1.120:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-APS-Web': ''
    //     }
    //   },
    //   "/charger-SCH-Web": {
    //     "target": "http://192.168.1.120:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-SCH-Web': ''
    //     }
    //   },
    //   "/charger-SYS-Web": {
    //     "target": "http://192.168.1.120:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-SYS-Web': ''
    //     }
    //   },
    //   "/charger-HR-Web": {
    //     "target": "http://192.168.1.120:9000",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-HR-Web': ''
    //     }
    //   }
    // },

    // 黄振亚
    // proxyTable: {
    //   "/api": {
    //     "target": "http://192.168.1.127:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   },
    //   "/charger-LAB-Web": {
    //     "target": "http://192.168.1.127:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-LAB-Web': ''
    //     }
    //   },
    //   "/charger-APS-Web": {
    //     "target": "http://192.168.1.127:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-APS-Web': ''
    //     }
    //   },
    //   "/charger-SCH-Web": {
    //     "target": "http://192.168.1.127:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-SCH-Web': ''
    //     }
    //   },
    //   "/charger-SYS-Web": {
    //     "target": "http://192.168.1.127:8088",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-SYS-Web': ''
    //     }
    //   },
    //   "/charger-HR-Web": {
    //     "target": "http://192.168.1.127:9000",
    //     "changeOrigin": true,
    //     pathRewrite: {
    //       '^/charger-HR-Web': ''
    //     }
    //   }
    // },


    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.  
    cssSourceMap: false
  }
}
