import { Platform as _Platform } from 'react-native'

import {
  BaraReactPlatform,
  PlatformSelectSpecifics,
  PlatformOSType,
  PlatformSelectOptions
} from './index.shared'

// From: https://github.com/cheton/is-electron
function isElectron() {
  if (
    !(typeof window !== 'undefined' && (window as any).bara === true && !!(window as any).ipc)
  ) {
    return false
  }

  if (
    typeof window !== 'undefined' &&
    typeof (window as any).process === 'object' &&
    (window as any).process.type === 'renderer'
  ) {
    return true
  }

  if (
    typeof process !== 'undefined' &&
    typeof process.versions === 'object' &&
    !!(process.versions as any).electron
  ) {
    return true
  }

  if (
    typeof navigator === 'object' &&
    typeof navigator.userAgent === 'string' &&
    navigator.userAgent.indexOf('Electron') >= 0
  ) {
    return true
  }

  return false
}

function getOSName(): PlatformOSType {
  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera

  if (/android/i.test(userAgent)) return 'android'

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream)
    return 'ios'

  return 'web'
}

const realOS = getOSName()

export const Platform: BaraReactPlatform = {
  realOS,
  ..._Platform,
  isElectron: isElectron(),
  isStandalone: (window.navigator as any).standalone,
  selectUsingRealOS<T>(
    specifics: PlatformSelectSpecifics<T>,
    { fallbackToWeb = false }: PlatformSelectOptions = {},
  ) {
    const result =
      Platform.realOS in specifics
        ? specifics[realOS]
        : fallbackToWeb && 'web' in specifics
        ? specifics.web
        : specifics.default

    return result
  },
}