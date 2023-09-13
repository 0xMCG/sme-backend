import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class PythonService {
  executeScript(scriptPath: string, args: any[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', [scriptPath, ...args]);

      let output = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        reject(data.toString());
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(`Python process exited with code ${code}`);
        }
      });
    });
  }
}
