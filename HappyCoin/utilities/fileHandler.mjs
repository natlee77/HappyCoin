import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

  export const writeFileAsync = async (folderName, fileName, data) => {
   try {   
      const filePath = path.join(_appdir, folderName, fileName);
      await writeFile(filePath, data);
   } catch (error) {
      throw new Error(error.message);
    }
  };

  export const readFileAsync = async (folderName, fileName) => {
    // if file exists and is not empty then read the file , else return empty array 
    try {
    const filePath = path.join(_appdir, folderName, fileName);

      if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
        return [];
      } else {
       const data = await readFile(filePath, { encoding: 'utf-8' });
       return JSON.parse(data);
      }
   } catch (error) {
      throw new Error(error.message);
  }
 };
