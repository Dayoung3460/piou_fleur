import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    '/((?!studio|api|_next/static|_next/image|favicon\.ico|fonts|images|.*\.ico|.*\.png|.*\.svg|.*\.jpg|.*\.jpeg|.*\.webp|.*\.gif).*)',
  ],
}
