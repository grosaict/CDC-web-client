class Auth {
    constructor() {
      this.authenticated = false;
    }

    isAuthenticated() {

      if(localStorage.getItem('token')){
          this.authenticated = true;
      }

      return this.authenticated;
      
    }

    logout()
    {

      if(localStorage.getItem('token')){
        localStorage.removeItem('token')
        this.authenticated = false;
      }
      
      return !this.authenticated;

    }

  }
  
  export default new Auth();