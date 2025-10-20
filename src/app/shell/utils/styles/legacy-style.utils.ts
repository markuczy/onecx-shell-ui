import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import {
  dataNoPortalLayoutStylesAttribute,
  dataStyleIdAttribute,
  dataStyleIsolationAttribute,
  dataPortalLayoutStylesKey,
  dataDynamicPortalLayoutStylesKey,
  isCssScopeRuleSupported,
  addStyleToHead,
  replaceRootWithScope
} from '@onecx/angular-utils'

export async function fetchPortalLayoutStyles(http: HttpClient) {
  return await firstValueFrom(http.request('get', `./portal-layout-styles.css`, { responseType: 'text' }))
}

export function loadPortalLayoutStyles(css: string) {
  loadPortalLayoutStylesStyles(css)
  loadDynamicPortalLayoutStylesStyles(css)
}

function loadPortalLayoutStylesStyles(css: string) {
  if (isCssScopeRuleSupported()) {
    addStyleToHead(
      `
      @scope([${dataStyleIdAttribute}]:not([${dataNoPortalLayoutStylesAttribute}])) to ([${dataStyleIsolationAttribute}]) {
      ${replaceRootWithScope(css)}
    }
    `,
      {
        [dataPortalLayoutStylesKey]: ''
      }
    )
  } else {
    const styleElement = addStyleToHead(
      `
      @supports(@scope([${dataStyleIdAttribute}]:not([${dataNoPortalLayoutStylesAttribute}])) to ([${dataStyleIsolationAttribute}])) {
          ${replaceRootWithScope(css)}
        }
        `,
      {
        [dataPortalLayoutStylesKey]: ''
      }
    )
    ;(styleElement as any).onecxOriginalCss = css
  }
}

// This could be merged with loadPortalLayoutStylesStyles but its important to preserve functionality of PRECISION mode polyfill
// which most likely relies on the fact that the dynamic styles are in a separate style element
function loadDynamicPortalLayoutStylesStyles(css: string) {
  if (isCssScopeRuleSupported()) {
    addStyleToHead(
      `
      @scope(body > :not([${dataNoPortalLayoutStylesAttribute}])) to ([${dataStyleIsolationAttribute}]) {
      ${replaceRootWithScope(css)}
    }
      `,
      {
        [dataDynamicPortalLayoutStylesKey]: ''
      }
    )
  } else {
    const styleElement = addStyleToHead(
      `
      @supports(@scope(body > :not([${dataNoPortalLayoutStylesAttribute}])) to ([${dataStyleIsolationAttribute}])) {
      ${replaceRootWithScope(css)}
    }
    `,
      {
        [dataDynamicPortalLayoutStylesKey]: ''
      }
    )
    ;(styleElement as any).onecxOriginalCss = css
  }
}
