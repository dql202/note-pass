export default class PDFJs {
  init = (source, element) => {
    const iframe = document.createElement('iframe');

    iframe.src = `/pdfjs-2.2.228-dist/web/viewer.html?file=${source}`;
    iframe.width = '80%';
    iframe.height = '60%';

    element.appendChild(iframe);
  }
}