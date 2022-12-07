import { Viewer, ViewerProps } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { ForwardedRef } from "react";

interface WrappedViewerProps {
  forwardedRef: ForwardedRef<Viewer>;
}

const WrappedViewer = (props: ViewerProps & WrappedViewerProps) => {
  // console.log("wrappedViewer", props);
  return <Viewer ref={props.forwardedRef} {...props} />;
};

export default WrappedViewer;
