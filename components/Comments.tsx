import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const Comments = () => {
  const commentsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  // 아래 코드는 다크모드 적용을 위한 내용이기에 생략해도 무관하다.

  useEffect(() => {
    const commentsEl = commentsRef.current?.firstChild;
    if (commentsEl) commentsRef.current?.removeChild(commentsEl);

    const scriptEl = document.createElement("script");
    scriptEl.src = "https://utteranc.es/client.js";
    scriptEl.async = true;
    scriptEl.crossOrigin = "anonymous";
    scriptEl.setAttribute("repo", "YiHyeongRae/hr.devlog-comment");
    scriptEl.setAttribute("issue-term", "pathname");
    scriptEl.setAttribute("theme", `dark-blue`);
    scriptEl.setAttribute("label", "Blog-comment");

    commentsRef.current?.appendChild(scriptEl);
  }, []);

  return <div ref={commentsRef} />;
};

export default Comments;
