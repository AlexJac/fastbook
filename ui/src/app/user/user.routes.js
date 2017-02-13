import ProfileController from './profile.controller'
import profileTemplateUrl from './profile.template'

import NavController from './nav.controller'
import navTemplateUrl from './nav.template'

export default {
  profile: {
    url: '/users/{id}',
    templateUrl: profileTemplateUrl,
    controller: ProfileController,
    controllerAs: '$profileCtrl',
    resolve: {
      user: ['userService', '$stateParams', function(userService, $stateParams){
        return userService.getUserById($stateParams.id);
      }],
      userFriendList: ['userService', '$stateParams', function(userService, $stateParams){
        return userService.getUserFriends($stateParams.id);
      }],
      userPosts: ['userService', '$stateParams', function (userService, $stateParams) {
        return userService.getUsersPosts($stateParams.id);
      }],
      userGroupList: ['userService', '$stateParams', function(userService, $stateParams){
        return userService.getUserGroups($stateParams.id);
      }]
    },
  data: {
    loggedIn: true
  },
},

  search: {
    url: '/user',
    templateUrl: navTemplateUrl,
    controller: NavController,
    controllerAs: '$nav',
    data: {
      loggedIn: true
    }
  }
}
