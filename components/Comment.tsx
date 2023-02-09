const Utterances: React.FC = () => (
  <section
    ref={(elem) => {
      if (!elem) {
        return;
      }
      const scriptElem = document.createElement("script");
      scriptElem.src = "https://utteranc.es/client.js";
      scriptElem.async = true;
      scriptElem.setAttribute("class", "comment");
      scriptElem.setAttribute("repo", "YiHyeongRae/hr.devlog-comment");
      scriptElem.setAttribute("issue-term", "pathname");
      scriptElem.setAttribute("theme", "dark-blue");
      scriptElem.setAttribute("label", "Blog-comment");
      scriptElem.crossOrigin = "anonymous";
      elem.appendChild(scriptElem);

      // if (elem.childElementCount === 0) {
      // }
    }}
  />
);

export default Utterances;
