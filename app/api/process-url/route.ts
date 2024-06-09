// app/api/childProcess-url/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: NextRequest) {
  
  const { url } = await req.json();
  console.log(url)

  //TODO: check if dirname is exact
  const scriptPath = path.join(process.cwd(), '/ml', 'data_collection.py');
  const childProcess = spawn('python', [scriptPath, url]);

  let result = '';

  childProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  childProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise<Response>((resolve) => {
    childProcess.on('close', (code) => {
      console.log("Child process closed with code:", code);
      
      // Parse the result if the child process exited successfully
      if (code === 0) {
        try {
          const childProcessedData = JSON.parse(result);
          resolve(NextResponse.json(childProcessedData, { status: 200 }));
        } catch (error) {
          console.error("Error parsing child processed data:", error);
          resolve(NextResponse.json({ error: 'Failed to parse childProcessed data.' }, { status: 500 }));
        }
      } else {
        // Handle child process error
        console.error("Child process failed with code:", code);
        resolve(NextResponse.json({ error: 'childProcessing failed.' }, { status: 500 }));
      }
    });
  });
}

export function GET(req: NextRequest) {
    return NextResponse.json({ error: 'Method not allowed' });
}

export function PUT(req: NextRequest) {
    return NextResponse.json({ error: 'Method not allowed' });
}

export function DELETE(req: NextRequest) {
    return NextResponse.json({ error: 'Method not allowed' });
}
