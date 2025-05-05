/* eslint-disable @typescript-eslint/no-explicit-any */

import moment from 'moment';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const localtime = searchParams.get('localtime')

        const timestamp = moment(localtime).unix() * 1000;
        const datetime = moment().format('YYYY-MM-DD HH:mm:ss');
        const timediff = difference(localtime!)

        return NextResponse.json({ timediff, timestamp, datetime }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }

}


const difference = (localtime: string) => {

    const date1 = moment(new Date(localtime))
    const date2 = moment(Date.now())

    const diffInDays = date1.diff(date2, 'days');
    console.log(`Difference in days: ${diffInDays}`);
    return diffInDays
}