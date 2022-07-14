import React from 'react'
import './style.css';

export const CodeExecutor = ({ srcDoc, selector }) => {
    return (<div className='code-executor'>

        <iframe
            srcDoc={srcDoc}
            title='output'
            sandbox='allow-scripts'
            className='code-frame'
        >    
            
        </iframe>

    </div>)
}