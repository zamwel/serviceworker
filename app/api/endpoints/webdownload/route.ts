import { exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const siteUrl = searchParams.get('url')
    await execPromise(`wget --mirror --convert-links --adjust-extension --page-requisites --no-parent ` + siteUrl)

    return new Response('Downloaded Successfully')
}
