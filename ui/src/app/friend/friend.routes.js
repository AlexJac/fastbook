import templateUrl from './review-friend-requests.template'
import ReviewFriendRequestsController from './review-friend-requests.controller'

export default {
  friendRequests: {
    url: '/user/{id}/requests',
    templateUrl: templateUrl,
    controller: ReviewFriendRequestsController,
    controllerAs: '$requestCtrl',
    resolve: {
      friendRequestsToResolve: ['friendService', 'accessService', function(friendService, accessService) {
        console.log(accessService.currentUser.id);
        return friendService.getFriendRequests(accessService.currentUser.id);
      }],
    },
    data: {
      loggedIn: true
    }
  }


}
