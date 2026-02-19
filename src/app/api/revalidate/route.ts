import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// This route is called by a Sanity webhook whenever content is published.
// Set up the webhook in Sanity: https://sanity.io/docs/webhooks
//   URL:    https://your-domain.com/api/revalidate?secret=YOUR_SECRET
//   Method: POST
//   Trigger: on publish / unpublish
//
// Add SANITY_REVALIDATE_SECRET to your environment variables (same value
// in both Sanity webhook settings and your Vercel project settings).

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid or missing secret' },
      { status: 401 }
    )
  }

  // Revalidate every page that shows Sanity content
  const paths = ['/', '/projects', '/events', '/gallery', '/resources', '/services', '/about']
  for (const path of paths) {
    revalidatePath(path, 'layout')
  }

  return NextResponse.json({ revalidated: true, now: Date.now() })
}

// Allow GET for quick health-check / testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid or missing secret' }, { status: 401 })
  }

  const paths = ['/', '/projects', '/events', '/gallery', '/resources', '/services', '/about']
  for (const path of paths) {
    revalidatePath(path, 'layout')
  }

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
