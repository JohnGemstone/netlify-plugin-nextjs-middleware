import { NextResponse } from 'next/server'
import { NextFetchEvent, NextRequest } from 'next/server'

type Route = {
  page: string
  cookie: string
  buckets: readonly string[]
}

const ROUTES: Record<string, Route | undefined> = {
  '/home': {
    page: '/home',
    cookie: 'bucket-home',
    buckets: ['original','test'],
  },
}

export function middleware(request: NextRequest, ev: NextFetchEvent) {
  let response
  const {
    nextUrl: { pathname },
  } = request

  if (pathname.startsWith('/cookies')) {
    response = NextResponse.next()
    response.cookies.set('netlifyCookie', 'true')
    return response
  }

  if (pathname.startsWith('/shows')) {
    if (pathname.startsWith('/shows/rewrite-absolute')) {
      response = NextResponse.rewrite(new URL('/shows/100', request.url))
      response.headers.set('x-modified-in-rewrite', 'true')
    }
    if (pathname.startsWith('/shows/rewrite-external')) {
      response = NextResponse.rewrite('http://example.com/')
      response.headers.set('x-modified-in-rewrite', 'true')
    }
    if (pathname.startsWith('/shows/rewriteme')) {
      const url = request.nextUrl.clone()
      url.pathname = '/shows/100'
      response = NextResponse.rewrite(url)
      response.headers.set('x-modified-in-rewrite', 'true')
    }

    if (!response) {
      response = NextResponse.next()
    }

    if (pathname.startsWith('/shows/static')) {
      response.headers.set('x-middleware-date', new Date().toISOString())
    }

    response.headers.set('x-modified-edge', 'true')
    response.headers.set('x-is-deno', 'Deno' in globalThis ? 'true' : 'false')

    return response
  }

  if (pathname.startsWith('/prefetch-dynamic') && pathname !== '/prefetch-dynamic') {
    console.log('pathname hit:', pathname)
    console.log('request:', request)
    const slug = pathname.split("/")[2];

    let cookiename = `ab-dynamic-${slug}`
    const buckets = ["original","test"]

    // check for cookie
    let bucket = request.cookies.get(cookiename);
    let reqHasBucket = new Boolean(bucket);

    // If there's no active bucket in cookies or its value is invalid, get a new one
    if (!bucket || !buckets.includes(bucket)) {
      bucket = getBucket(buckets);
      reqHasBucket = false;
    }

    // Modify the request to point to the correct bucket
    let url = request.nextUrl.clone();

    // If the bucket is not the original one,
    // Create a rewrite to the page matching the bucket
    if (bucket !== "original") {
      url.pathname = `/prefetch-dynamic/abtest/${slug}`;
    }

    response = NextResponse.rewrite(url);

    // Add the bucket to the response cookies if it's not there
    // or if its value was invalid
    if (!reqHasBucket) {
      response.cookies.set(cookiename, bucket);
    }
  
    return response;
  }

  if (pathname.startsWith('/prefetch-static') && pathname !== '/prefetch-static') {
    console.log('pathname hit:', pathname)
    console.log('request:', request)
    const slug = pathname.split("/")[2];

    let cookiename = `ab-static-${slug}`
    const buckets = ["original","test"]

    // check for cookie
    let bucket = request.cookies.get(cookiename);
    let reqHasBucket = new Boolean(bucket);

    // If there's no active bucket in cookies or its value is invalid, get a new one
    if (!bucket || !buckets.includes(bucket)) {
      bucket = getBucket(buckets);
      reqHasBucket = false;
    }

    // Modify the request to point to the correct bucket
    let url = request.nextUrl.clone();

    // If the bucket is not the original one,
    // Create a rewrite to the page matching the bucket
    if (bucket !== "original") {
      url.pathname = `/prefetch-static/abtest/${slug}`;
    }

    response = NextResponse.rewrite(url);

    // Add the bucket to the response cookies if it's not there
    // or if its value was invalid
    if (!reqHasBucket) {
      response.cookies.set(cookiename, bucket);
    }
  
    return response;
  }
}


export function getBucket(buckets) {
  let n = cryptoRandom() * 100;
  let percentage = 100 / buckets.length;

  return (
    buckets.find(() => {
      n -= percentage;
      return n <= 0;
    }) ?? buckets[0]
  );
}

function cryptoRandom() {
  return crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1);
}

export const config = {
  matcher: ["/cookies/:path*", "/shows/:path*", "/prefetch-dynamic/:path*","/prefetch-static/:path*"],
};