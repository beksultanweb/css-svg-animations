import React, { useState } from 'react';
import './style.css';
import Button from '../Button';
import Editor from '../CodeEditor';

const MyEditor = () => {
  const [openedEditor, setOpenedEditor] = useState('html');

  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  


  const onTabClick = (editorName) => {
    setOpenedEditor(editorName);
  };

  

  // useEffect(() => {
  //   const timeOut = setTimeout(() => {
  //     setSrcDoc(
  //       `
  //         <html>
  //           <body>${html}</body>
  //           <style>${css}</style>
  //           <script>${js}</script>
  //         </html>
  //       `
  //     )
  //   }, 250);

  //   return () => clearTimeout(timeOut)
  // }, [html, css, js])
  return (
    <div className="editor-code">
      <div className="tab-button-container">
        <Button title="HTML" onClick={() => {
          onTabClick('html')
        }} />
        <Button title="CSS" onClick={() => {
          onTabClick('css')
        }} />
      </div>
      <div className="editor-container">
        {
          openedEditor === 'html' ? (
            <Editor
              language="xml"
              displayName="HTML"
              value={html}
              setEditorState={setHtml}
            />
          ) : openedEditor === 'css' ? (
            <Editor
              language="css"
              displayName="CSS"
              value={css}
              setEditorState={setCss}
            />
          ) : ""
        }
        
      </div>
      
      
       
    </div>
  )
}

export default MyEditor;






