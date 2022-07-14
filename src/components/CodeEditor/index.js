import React from 'react';
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/dracula.css';
// import 'codemirror/theme/abcdef.css';

import 'codemirror/theme/ayu-mirage.css';
// import 'codemirror/theme/night.css';

import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';

import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';

import { Controlled as ControlledEditorComponent } from 'react-codemirror2';



const Editor = ({ language, value, setEditorState }) => {

  console.log({value});
  // const [theme, setTheme] = useState("ayu-mirage")
  const handleChange = (editor, data, value) => {
    setEditorState(value);
  }

  // const themeArray = ['ayu-mirage', 'dracula', 'abcdef', 'night']

  return (
    <div className="editor-container">
      {/* <div style={{marginBottom: "10px"}}>
        <label for="cars">Choose a theme: </label>
        <select name="theme" onChange={(el) => {
          setTheme(el.target.value)
        }}>
          {
            themeArray.map( theme => (
              <option value={theme}>{theme}</option>
            ))
          }
        </select>
      </div> */}
      <ControlledEditorComponent
        onBeforeChange={handleChange}
        value= {value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: "ayu-mirage",
          autoCloseTags: true,
          autoCloseBrackets: true, 
        }}
      />
    </div>
  )
}

export default Editor
