import angular from 'angular'

import accessRoutes from './access.routes'
import AccessService from './access.service'
import config from './access.config'

export default
  angular
    .module('fastbook.access', [])
    .constant('accessRoutes', accessRoutes)
    .service('accessService', AccessService)
    .config(config)
    .name
