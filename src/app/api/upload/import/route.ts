import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    console.log("here...heyyy .....")
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File;
  if (!file) {
;
    return NextResponse.json({ success: false })
  }
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const path =  `/Users/REDA/Desktop/tasks/public/DataVisualisation.xlsx`
  console.log("path",path); await writeFile(path, buffer) 
  console.log(`open ${path} to see the uploaded file`)
  return NextResponse.json({ success: true })
}