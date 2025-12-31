import path from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { federation } from '@module-federation/vite'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import angular from '@analogjs/vite-plugin-angular'

// Vite does not allow specific tsconfig, but uses tsconfig.json and respects references
// https://vite.dev/guide/features#typescript-compiler-options

// prod config not set
// budgets
// outputHashing
// dev config not set
// buildOptimizer
// optimization
// vendorChunk
// extractLicenses
// sourceMap
// namedChunks
// outputHashing
// local-env config not set
// outputHashing

const moduleFederationConfig = {
  plugins: [
    federation({
      name: 'onecx-shell-ui',
      exposes: {
        './OneCXVersionInfoComponent': 'src/app/remotes/version-info/version-info.component.main.ts',
        './OneCXShellToastComponent': 'src/app/remotes/shell-toast/shell-toast.component.main.ts'
      },
      shared: {
        '@angular/core': { requiredVersion: 'auto' },
        '@angular/common': {
          requiredVersion: 'auto'
        },
        '@angular/common/http': { requiredVersion: 'auto' },
        '@angular/elements': { requiredVersion: 'auto' },
        '@angular/forms': { requiredVersion: 'auto' },
        '@angular/platform-browser': { requiredVersion: 'auto' },
        '@angular/router': { requiredVersion: 'auto' },
        '@ngx-translate/core': { requiredVersion: 'auto' },
        primeng: { requiredVersion: 'auto' },
        rxjs: { requiredVersion: 'auto' },
        '@onecx/accelerator': { requiredVersion: 'auto' },
        '@onecx/angular-accelerator': { requiredVersion: 'auto' },
        '@onecx/angular-auth': { requiredVersion: 'auto' },
        '@onecx/angular-integration-interface': { requiredVersion: 'auto' },
        '@onecx/angular-remote-components': { requiredVersion: 'auto' },
        '@onecx/angular-utils': { requiredVersion: 'auto' },
        '@onecx/angular-webcomponents': { requiredVersion: 'auto' },
        '@onecx/integration-interface': { requiredVersion: 'auto' },
        '@onecx/portal-layout-styles': { requiredVersion: 'auto' }
      }
    })
  ]
}
// assetsInclude: [
//   "**/src/favicon.ico",
//   "**/src/assets/**",
//   "**/pre_loaders/angular-18/node_modules/@onecx/portal-integration-angular/assets/**",
//   "**/node_modules/@onecx/angular-accelerator/assets/**",
//   "**/node_modules/@onecx/angular-utils/assets/**",
//   "**/node_modules/@onecx/shell-core/assets/**",
//   "**/pre_loaders/angular-18/dist/onecx-angular-18-loader/**",
//   "**/pre_loaders/angular-19/dist/onecx-angular-19-loader/**",
//   "**/pre_loaders/angular-20/dist/onecx-angular-20-loader/**"
// ],
// "assets": [
//   {
//     "glob": "**/*",
//     "input": "./pre_loaders/angular-18/node_modules/@onecx/portal-integration-angular/assets/",
//     "output": "/onecx-portal-lib/assets/"
//   },
//   {
//     "glob": "**/*",
//     "input": "./node_modules/@onecx/angular-accelerator/assets/",
//     "output": "/onecx-angular-accelerator/assets/"
//   },
//   {
//     "glob": "**/*",
//     "input": "./node_modules/@onecx/angular-utils/assets/",
//     "output": "/onecx-angular-utils/assets/"
//   },
//   {
//     "glob": "**/*",
//     "input": "./node_modules/@onecx/shell-core/assets/",
//     "output": "/onecx-shell-core/assets/"
//   },
//   {
//     "glob": "**/*",
//     "input": "./pre_loaders/angular-18/dist/onecx-angular-18-loader",
//     "output": "/pre_loaders/onecx-angular-18-loader"
//   },
//   {
//     "glob": "**/*",
//     "input": "./pre_loaders/angular-19/dist/onecx-angular-19-loader",
//     "output": "/pre_loaders/onecx-angular-19-loader"
//   },
//   {
//     "glob": "**/*",
//     "input": "./pre_loaders/angular-20/dist/onecx-angular-20-loader",
//     "output": "/pre_loaders/onecx-angular-20-loader"
//   }
// ],
// "polyfills": ["zone.js"],
// "tsConfig": "./tsconfig.app.json",
// "inlineStyleLanguage": "scss",
// "styles": [
//   {
//     "input": "./src/splash.scss",
//     "inject": true
//   },
//   {
//     "input": "./src/global-styles.scss",
//     "bundleName": "global-styles",
//     "inject": true
//   },
//   {
//     "input": "./src/shell-styles.scss",
//     "bundleName": "shell-styles",
//     "inject": false
//   },
//   {
//     "input": "./src/portal-layout-styles.scss",
//     "bundleName": "portal-layout-styles",
//     "inject": false
//   }
// ]

export default defineConfig(({ command, mode }) => {
  // ...config,
  // plugins: [...plugins, modifyPrimeNgPlugin, modifyAngularCorePlugin],
  // plugins: [...config.plugins],
  // module: { parser: { javascript: { importMeta: false } } }

  return {
    ...moduleFederationConfig,
    root: 'src',
    // build: {
    // target: 'esnext', // required for module federation top-level await but does not support all browsers (https://caniuse.com/?search=top+level+await), could be replaced with vite-plugin-top-level-await to support more browsers
    // rollupOptions: {
    //   input: {
    //     main: path.resolve(__dirname, 'src/index.html'),
    //     'portal-layout-styles': path.resolve(__dirname, 'src/portal-layout-styles.scss'),
    //     'shell-styles': path.resolve(__dirname, 'src/shell-styles.scss')
    //   },
    //   output: {
    //     assetFileNames: (assetInfo) => {
    //       // Place CSS assets in /assets/
    //       if (assetInfo.names.some((name) => name.endsWith('.css'))) {
    //         return '[name][extname]'
    //       }
    //       return '[name][extname]'
    //     }
    //   }
    // }
    // },
    server: {
      ...(mode === 'local-env'
        ? { host: '0.0.0.0', allowedHosts: true, origin: 'http://localhost:4300/onecx-shell', port: 4300 }
        : {})
    },
    resolve: {
      mainFields: ['module']
    },
    plugins: [
      angular(),
      ...moduleFederationConfig.plugins,
      // Required to read path mappings from tsconfig.json
      nxViteTsPaths()
      // viteStaticCopy({
      //   targets: [
      //     { src: '../src/assets/**/*', dest: 'assets' },
      //     { src: '../node_modules/@onecx/angular-accelerator/assets/**/*', dest: 'onecx-angular-accelerator/assets' },
      //     { src: '../node_modules/@onecx/angular-utils/assets/**/*', dest: 'onecx-angular-utils/assets' }
      //   ]
      // })
    ],
    ...(mode === 'local-env' ? { base: '/onecx-shell/' } : {})
    // ...(mode === 'production' ? { base: '/onecx-shell/' } : {}) // Temporary workaround for production deployment
  }
})

// const modifyPrimeNgPlugin = new ModifySourcePlugin({
//   rules: [
//     {
//       test: (module) => {
//         return module.resource && module.resource.includes('primeng')
//       },
//       operations: [
//         new ReplaceOperation(
//           'all',
//           'document\\.createElement\\(',
//           'document.createElementFromPrimeNg({"this": this, "arguments": Array.from(arguments)},'
//         ),
//         new ReplaceOperation('all', 'Theme.setLoadedStyleName', '(function(_){})')
//       ]
//     }
//   ]
// })

// // Replace createElement only in @angular/platform-browser SharedStylesHost
// const modifyAngularCorePlugin = new ModifySourcePlugin({
//   rules: [
//     {
//       test: (module) => {
//         return module.resource && module.resource.includes('@angular/platform-browser')
//       },
//       operations: [
//         new ReplaceOperation(
//           'all',
//           "this\\.doc\\.createElement\\(\\'style\\'",
//           "this.doc.createElementFromSharedStylesHost({'this': this, 'arguments': Array.from(arguments)},'style'"
//         )
//       ]
//     }
//   ]
// })
