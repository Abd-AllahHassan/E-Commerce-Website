import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the public routes
const isPublicRoute = createRouteMatcher([
  '/', // Public homepage
  '/product-details/(.*)', // Public product details
  '/sign-in(.*)', // Sign-in route
  '/sign-up(.*)' // Sign-up route
]);

export default clerkMiddleware((auth, request) => {
  // Check if the request is for a public route
  if (!isPublicRoute(request)) {
    // If it's not a public route, require authentication
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
