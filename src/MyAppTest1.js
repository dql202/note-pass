import React from 'react';
// import { Document, Page } from 'react-pdf';
import { Document, Page, pdfjs } from "react-pdf";
 pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  export default class MyAppTest1 extends React.Component {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div style={{ width: 600 }}>
          <Document
            file="webviewer-demo.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}



//  class MyApp extends React.Component {
 
//   state = {
//     file: "/webviewer-demo.pdf",
//     numPages: 0,
//     pageNumber: 1
//   }
 
//   onFileChange = (event) => {
//     this.setState({
//       file: event.target.files[0]
//     });
//   }
 
//   onDocumentLoadSuccess = ({ numPages }) => {
//     this.setState({ numPages });
//   }
 
//   nextPage = () => {
 
//     const currentPageNumber = this.state.pageNumber;
//     let nextPageNumber;
 
//     if (currentPageNumber + 1 > this.state.numPages) {
//       nextPageNumber = 1;
//     } else {
//       nextPageNumber = currentPageNumber + 1;
//     }
 
//     this.setState({
//       pageNumber: nextPageNumber
//     });
//   }
 
// render() {
//    const { pageNumber, numPages } = this.state;
 
//    return (
//     <div>
//        <h1>PDF Preview</h1>
//          <button onClick={this.nextPage}></button>
 
//            <Document file={this.state.file} 
//                      onLoadSuccess={this.onDocumentLoadSuccess} 
//                      noData={<h4>No file</h4>}>
//              <Page pageNumber={pageNumber} />
//            </Document>
 
//            {this.state.file ? <p>Page {pageNumber} of {numPages}</p> : null}
//            </div>
//    );
//   }
// }

