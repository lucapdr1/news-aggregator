import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: NextRequest) {
  
  const { text } = await req.json();
  console.log(text)

  //TODO: check if dirname is exact
  const scriptPath = path.join(process.cwd(), '/ml', 'political_bias_detection.py');
  const childProcess = spawn('python', [scriptPath, text]);

  let result = '';

  childProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  childProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((resolve) => {
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