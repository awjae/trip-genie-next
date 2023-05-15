import { getCities, getSpots } from '@/lib/serverQueries';
import { NextResponse } from 'next/server';

//use client 에 유의미
export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search).get('cityId')
  const result = await getSpots(Number(searchParams))
  return NextResponse.json({ result: result.result })
}
export async function HEAD(request: Request) {}
 
export async function POST(request: Request) {
  console.log(request.body)

  return NextResponse.json({ result: "" })
}
 
export async function PUT(request: Request) {}
 
export async function DELETE(request: Request) {}
 
export async function PATCH(request: Request) {}
 
export async function OPTIONS(request: Request) {}