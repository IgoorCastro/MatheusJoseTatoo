import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // Importa a função do 'jose'

const SECRET_KEY = process.env.SECRET_KEY as string;

export const config = {
  matcher: ['/admin', '/logout', '/login'],
};

export default async function authMiddleware(req: NextRequest) {
  // Logout
  const pathName = req.nextUrl.pathname;
  // const logout = req.nextUrl.pathname === '/logout';

  if (pathName === '/logout') {
    const resp = NextResponse.json({ message: 'Log out' });

    try {
      // Remove o cookie 'token'
      resp.cookies.set("token", "", {
        path: "/",
        expires: new Date(0), // Define expiração no passado
        httpOnly: true,       // Proteção contra XSS
        secure: true,         // Apenas em HTTPS
        sameSite: "strict",   // Proteção contra ataques CSRF
      });

      return resp;
    } catch (err) {
      console.log('Log out Error:', err);
    }
  }

  // Login & auth
  const token = req.cookies.get('token')?.value;

  // const pathnames = req.nextUrl.pathname === '/login';
  if (pathName === '/login' && token) return NextResponse.redirect(new URL('/admin', req.url)); // encaminha para '/admin' caso ja esteja logado

  // Autenticação
  if (!token) return pathName === '/admin' ? NextResponse.redirect(new URL('/unauthorized', req.url)) : null; //

  try {
    // Verificação do token com 'jose'
    await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    return NextResponse.next();
  } catch (err) {
    console.log('JWT Error:', err);
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
}