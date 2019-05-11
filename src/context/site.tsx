import React from 'react'

import { DengineConfig } from '../types'

const siteConfig: DengineConfig = {} // Begin empty, populated on load. Defaults can be set here if needed

export default React.createContext(siteConfig)
