import { register, useBarnStream } from 'bara'
import App from './App'
import './index.css'
import {
  useReactApp,
  useTouchableStream,
  useTextStream,
  mapBarnWithReact,
} from './lib'

import { welcomeTrigger } from './examples/features/welcome'

const BaraApp = () => {
  const [setState] = useBarnStream({
    version: '1.0.0',
    welcome: 'Welcome to Bara React App!',
  })
  useReactApp('bara-app', App)
  mapBarnWithReact(setState)
  useTouchableStream()
  useTextStream()
  welcomeTrigger(setState)
}

const data = register(BaraApp)
console.log(data)
