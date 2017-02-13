import angular from 'angular'

import ngAnimate from 'angular-animate'
import ngAria from 'angular-aria'
import ngMaterial from 'angular-material'
import ngMessages from 'angular-messages'
import ngSanitize from 'angular-sanitize'
import uiRouter from 'angular-ui-router'

import fbUser from './user/user.module'
import fbAccess from './access/access.module'
import fbFriend from './friend/friend.module'
import fbGroup from './group/group.module'

import controller from './app.controller'
import config from './app.config'
import run from './app.run'

import 'normalize.css'
import 'angular-material/angular-material.css'
import './index.css'

export default
  angular
    .module('fastbook', [
      ngAnimate,
      ngAria,
      ngMaterial,
      ngMessages,
      ngSanitize,
      uiRouter,
      fbUser,
      fbAccess,
      fbFriend,
      fbGroup
    ])
    .controller(controller.name, controller)
    .config(config)
    .run(run)
    .name
