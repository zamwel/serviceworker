/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const siteUrl = searchParams.get('url')

  if (!siteUrl) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
  }

  try {
    const response = await axios.get(siteUrl)
    const htmlContent = response.data

    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename="page.html"',
      },
    })
  } catch (error:any) {
    return NextResponse.json({ error: 'Failed to fetch site'+error.message }, { status: 500 })
  }
}
