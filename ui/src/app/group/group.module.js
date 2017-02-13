import angular from 'angular'

import groupRoutes from './group.routes'
import groupService from './group.service'
import config from './group.config'

export default
  angular
    .module('fastbook.group', [])
    .constant('groupRoutes', groupRoutes)
    .service('groupService', groupService)
    .config(config)
    .name
