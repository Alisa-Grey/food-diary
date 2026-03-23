import * as pdfjs from 'pdfjs-dist';
import Resizer from 'react-image-file-resizer';
const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export const readFileData = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve((e.target as FileReader).result);
    };
    reader.onerror = err => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};

export const resizeFile = (file: File) =>
  new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      rotation,
      uri => {
        resolve(uri);
      },
      'file',
    );
  });

export const getFileFromBase64 = async (base64Url: string[]) => {
  return fetch(base64Url as unknown as string)
    .then(res => res.blob())
    .then(blob => {
      return new File([blob], 'File name', { type: 'image/jpeg' });
    });
};

export const convertPdfToImages = async (file: File) => {
  const images: string[] = [];
  const data = await readFileData(file);
  const pdf = await pdfjs.getDocument(data as ArrayBuffer).promise;
  const canvas = document.createElement('canvas');
  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const viewport = page.getViewport({ scale: 1 });
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context as CanvasRenderingContext2D, viewport: viewport })
      .promise;
    images.push(canvas.toDataURL());
  }
  canvas.remove();
  return images;
};

const resizerDefaultParams = {
  maxWidth: 640,
  maxHeight: 640,
  compressFormat: 'JPEG',
  quality: 75,
  rotation: 0,
};

export const { maxWidth, maxHeight, compressFormat, quality, rotation } = resizerDefaultParams;

export const previewWidth = 240;
export const previewHeight = 240;
