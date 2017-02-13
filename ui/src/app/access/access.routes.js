import registerTemplateUrl from './register.template'
import RegisterController from './register.controller'

import loginTemplateUrl from './login.template'
import LoginController from './login.controller'

export default {
  register: {
    url: '/',
    templateUrl: registerTemplateUrl,
    controller: RegisterController,
    controllerAs: '$register',
    data: {
      loggedIn: false
    }
  },

  login: {
    url: '/login',
    templateUrl: loginTemplateUrl,
    controller: LoginController,
    controllerAs: '$login',
    data: {
      loggedIn: false
    }
  }
}
