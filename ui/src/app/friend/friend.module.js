import angular from 'angular';

import FriendRelationController from './friend-relation.controller'
import FriendService from './friend.service'
import config from './friend.config'

export default
  angular
    .module('fastbook.friend', [])
    .controller(FriendRelationController.name, FriendRelationController)
    .name
