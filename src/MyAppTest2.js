import React, { Component } from 'react';
import './App.css';
import PDFViewer from './components/PDFViewer/PDFViewer';
import PDFJSBackend from './backends/pdfjs';
import { ListGroup, Accordion, Card, Button } from 'react-bootstrap/';



export default class MyAppTest2 extends Component {
  render() {
    return (
      <div className="App">
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Show PDF
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <PDFViewer 
                    backend={PDFJSBackend}
                    src='/webviewer-demo.pdf'
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        <a href="/webviewer-demo.pdf" download>
          <button> Download PDF </button>
        </a>
      </div>
    );
  }t
}  