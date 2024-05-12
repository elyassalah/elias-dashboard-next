
// middleware must to be in the root
import NextAuth from 'next-auth';
import { authConfig } from './app/authconfig';
// to run the authConfig with every request except matcher that have static file and api we should write this
//  otherwise we wont be able to see our images
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};