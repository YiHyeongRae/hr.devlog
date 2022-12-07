import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer, ViewerProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import { ForwardedRef, forwardRef, useRef } from "react";

const WrappedViewer = dynamic(() => import("./WrappedViewer"), {
  ssr: false,
});

const ForwardViewer = forwardRef(
  (props: ViewerProps, forwardedRef: ForwardedRef<Viewer>) => {
    return <WrappedViewer {...props} forwardedRef={forwardedRef} />;
  }
);
ForwardViewer.displayName = "ForwardedViewer";

interface TuiViewerProps {
  initialValue: string;
}

// const TuiViewer = ({ data }: any) => {
//   const ref = useRef<Viewer>(null);
//   return <ForwardViewer ref={ref} initialValue={data} />;
// };
// export default TuiViewer;

const TuiViewer = ({ initialValue }: TuiViewerProps) => {
  // console.log("viewer-index", initialValue);
  const ref = useRef<Viewer>(null);

  return <ForwardViewer ref={ref} initialValue={initialValue} />;
};

export default TuiViewer;
