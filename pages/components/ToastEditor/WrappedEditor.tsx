import { Editor, EditorProps } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { ForwardedRef } from "react";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
interface WrappedEditorProps {
  forwardedRef: ForwardedRef<Editor>;
}

const WrappedEditor = (props: EditorProps & WrappedEditorProps) => {
  return (
    <Editor
      ref={props.forwardedRef}
      {...props}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }], colorSyntax]}
      theme={"white"}
    />
  );
};

export default WrappedEditor;
