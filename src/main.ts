console.log('Loading dependencies and global styles...')
// Polyfill zone.js for Angular's change detection mechanism
import 'zone.js'
// Global styles
import './splash.scss'
import './global-styles.scss'

// console.log('Preparing module federation instance...')

// import { createInstance } from '@module-federation/enhanced/runtime'

// createInstance({
//   name: 'onecx_shell_ui',
//   remotes: []
// })

// console.log('Loading preloader modules...')

// import {
//   angular18Preloader,
//   angular19Preloader,
//   angular20Preloader,
//   ensurePreloaderModuleLoaded,
//   loadPreloaderModule
// } from './app/shell/utils/preloader.utils'
// window['onecxPreloaders'] ??= {}
// const preloaders = [angular18Preloader, angular19Preloader, angular20Preloader]

// Promise.all([...preloaders.map(loadPreloaderModule), ...preloaders.map(ensurePreloaderModuleLoaded)]).then(() => {
console.log('Bootstrapping Shell application...')
import('./bootstrap').catch((err) => console.error(err))
// })
