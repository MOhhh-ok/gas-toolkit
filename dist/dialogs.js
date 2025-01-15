"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showDownloadDialog = showDownloadDialog;
const BOM = [239, 187, 191];
function showDownloadDialog(params) {
    const { mimeType, fileName, data, addBom } = params;
    const dataBytes = Utilities.newBlob(data).getBytes();
    const finalBytes = addBom ? [...BOM, ...dataBytes] : dataBytes;
    const base64 = Utilities.base64Encode(finalBytes);
    const html = `
    <html>
      <head>
        <script>
          function download(){
            try {
              const base64 = "${base64}";
              const binaryString = atob(base64);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              const blob = new Blob([bytes], { type: '${mimeType}' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = '${fileName}';
              link.click();
              google.script.host.close();
            } catch (e) {
              alert(e);
            }
          }
        </script>
      </head>
      <body>
        <h2>${fileName}</h2>
        <button onclick="download()">Download</button>
      </body>
    </html>
`;
    SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html), 'Download');
}
