

export const authConfig = {
  // we are using bcrypt to hash and compare our password
  // and we are using this config in middleware the problem is the bcrypt is not js dependent
  // so we cannot write the provider here , we going to create a new file
  // leave this provider here empty cause we use it in auth.js file
  providers:[],
  pages: {
    signIn:"/login"
  },
  /* 
  we create a callbacks that we can write the authorization logic cause is we are not logged in
  it will not allow us to see the dashboard its going to redirect us to login page and if we are logged in
  it not going to see login page its going to redirect us to dashboard,
  --now we have to run this function for every request todo that we can use next js middleware
  */
  callbacks: {
    /* 
      going to take our session that is (auth) and request so we can check the request url
    */
    authorized({ auth, request}) {
      // if there is user inside our session it means we are logged in
      const isLoggedIn = auth?.user
      // now check we in which page
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard")
      if (isOnDashboard) {
          // that if user isLoggedIn and isOnDashboard user can stay on dashboard
        if (isLoggedIn) return true
        // else that return false and its going to redirect unauthenticated users to login page
        return false  
      } else if (isLoggedIn) {
        // we are not on the dashboard but we are LoggedIn we are going to redirect to the dashboard
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      // here user can stay wherever they are maybe home or any else dashboard
      return true;
    }
    
  }
}