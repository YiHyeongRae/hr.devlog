import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor, EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";

const WrappedEditor = dynamic(() => import("./WrappedEditor"), { ssr: false });

const ForwardedEditor = forwardRef(
  (props: EditorProps, forwardedRef: ForwardedRef<Editor>) => {
    return <WrappedEditor {...props} forwardedRef={forwardedRef} />;
  }
);
ForwardedEditor.displayName = "ForwardedEditor";

interface TuiEditorProps {
  initialValue: string;
  onChange: (e: string) => void;
}

function asdf() {
  console.log(1);
}
const TuiEditor = ({ initialValue, onChange }: TuiEditorProps) => {
  const ref = useRef<Editor>(null);

  // initialValue가 바뀌면 Editor의 내용을 바꿔준다.
  useEffect(() => {
    if (!ref.current) return;

    const instance = ref.current.getInstance();
    instance.setHTML(initialValue);
  }, [initialValue]);

  // Editor의 내용이 바뀔때 넘겨받은 핸들러에 내용을 넘겨준다.
  const handleChange = useCallback(() => {
    if (!ref.current) return;

    const instance = ref.current.getInstance();
    onChange(instance.getMarkdown());
  }, [onChange]);

  return (
    <ForwardedEditor
      ref={ref}
      initialValue={initialValue}
      onChange={handleChange}
      height={"100vh"}
      theme={"white"}
      previewStyle={"vertical"}

      // hooks={{
      //   addImageBlobHook: (blob, callback) => {
      //     const formData = new FormData();
      //     formData.append("file", blob);

      //     const uploadInput: any = {
      //       formData: formData,
      //       successCallback: (res: any) =>
      //         callback(res.data.upload_image_url, "image"),
      //     };

      //     upload.mutate(uploadInput);
      //   },
      // }}
    />
  );
};

export default TuiEditor;
