import React, { Fragment, Component } from 'react'
import Editor from 'react-simple-code-editor'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'


const styles = {
  root: {
    margin: "1vw",
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: "10px",
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    ...theme.plain
  }
}


class EditorRenderedSnippets extends Component {


  onValueChange = code => {
    
  }
/*   componentDidUpdate() {
    this.props.setCodeValue(this.state.code)
  } */

  highlight = code => (
    <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  )

  render() {
    return (
      <>
      {this.props.articles[this.props.indexOfCode] && <Editor
        value={this.props.articles[this.props.indexOfCode] && this.props.articles[this.props.indexOfCode].details}
        onValueChange={this.onValueChange}
        highlight={this.highlight}
        padding={10}
        style={styles.root}
      />}
      </>
    )
  }
}
export default EditorRenderedSnippets
