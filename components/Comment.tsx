import React from "react";

const Utterances: React.FC = () => (
  <section
    ref={(elem) => {
      if (!elem) {
        return;
      }
      const scriptElem = document.createElement("script");
      scriptElem.src = "https://utteranc.es/client.js";
      scriptElem.async = true;
      scriptElem.setAttribute("repo", "YiHyeongRae/hr.devlog-comment");
      scriptElem.setAttribute("issue-term", "pathname");
      scriptElem.setAttribute("theme", "dark-blue");
      scriptElem.setAttribute("label", "blog-comment");
      scriptElem.crossOrigin = "Blog-comment";
      elem.appendChild(scriptElem);
    }}
  />
);

export default Utterances;
