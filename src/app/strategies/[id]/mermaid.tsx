"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";
import mermaid from "mermaid";

interface MermaidProps {
  chart?: string;
}

const a = `
flowchart LR
LdHIVHI7dpAYFqCHEenA(["Start"])
b96039cd-bf7e-4c81-bbc3-c25fe567137e{"relative-strength-index(QQQ, 10) &gt; 79"}
6626f6ee-4bb3-49c3-89ae-6dcaad00959a["UVXY - 40.00%"]
a698392b-007d-42c0-8c32-a75acad805f1["BIL - 60.00%"]
8f854a85-d68e-49a3-8a23-8e777569b805{"relative-strength-index(QQQ, 10) &lt; 31"}
a27a4932-494f-4343-b6cb-1bc0caa65372["TQQQ - 100.00%"]
07fb6e23-effe-480e-a9c1-27be8fbbcde2{"current-price(SPY) &gt; moving-average-price(SPY, 200)"}
dea0eff3-fa1c-49ad-abc7-0a5831b07abe{"current-price(SPY) &gt; moving-average-price(SPY, 30)"}
abee2c23-b910-4730-97ea-e182240d664b["QLD - 100.00%"]
adaf00f9-f545-4748-bd66-0291acde2496["UPW - 100.00%"]
00c22ad3-f224-424f-afd7-5b0643307315{"current-price(SPY) &gt; moving-average-price(SPY, 30)"}
855e9167-faee-4621-8e7c-8ab8c6dbcda1["QLD - 100.00%"]
a1a999dc-c8fd-4490-a377-54ceaca1af5e["GLD - 100.00%"]
LdHIVHI7dpAYFqCHEenA --> b96039cd-bf7e-4c81-bbc3-c25fe567137e
b96039cd-bf7e-4c81-bbc3-c25fe567137e --- b96039cd-bf7e-4c81-bbc3-c25fe567137e_yes["Yes"]
b96039cd-bf7e-4c81-bbc3-c25fe567137e_yes --> 6626f6ee-4bb3-49c3-89ae-6dcaad00959a
b96039cd-bf7e-4c81-bbc3-c25fe567137e_yes --> a698392b-007d-42c0-8c32-a75acad805f1
b96039cd-bf7e-4c81-bbc3-c25fe567137e --- b96039cd-bf7e-4c81-bbc3-c25fe567137e_no["No"]
b96039cd-bf7e-4c81-bbc3-c25fe567137e_no --> 8f854a85-d68e-49a3-8a23-8e777569b805
8f854a85-d68e-49a3-8a23-8e777569b805 --- 8f854a85-d68e-49a3-8a23-8e777569b805_yes["Yes"]
8f854a85-d68e-49a3-8a23-8e777569b805_yes --> a27a4932-494f-4343-b6cb-1bc0caa65372
8f854a85-d68e-49a3-8a23-8e777569b805 --- 8f854a85-d68e-49a3-8a23-8e777569b805_no["No"]
8f854a85-d68e-49a3-8a23-8e777569b805_no --> 07fb6e23-effe-480e-a9c1-27be8fbbcde2
07fb6e23-effe-480e-a9c1-27be8fbbcde2 --- 07fb6e23-effe-480e-a9c1-27be8fbbcde2_yes["Yes"]
07fb6e23-effe-480e-a9c1-27be8fbbcde2_yes --> dea0eff3-fa1c-49ad-abc7-0a5831b07abe
dea0eff3-fa1c-49ad-abc7-0a5831b07abe --- dea0eff3-fa1c-49ad-abc7-0a5831b07abe_yes["Yes"]
dea0eff3-fa1c-49ad-abc7-0a5831b07abe_yes --> abee2c23-b910-4730-97ea-e182240d664b
dea0eff3-fa1c-49ad-abc7-0a5831b07abe --- dea0eff3-fa1c-49ad-abc7-0a5831b07abe_no["No"]
dea0eff3-fa1c-49ad-abc7-0a5831b07abe_no --> adaf00f9-f545-4748-bd66-0291acde2496
07fb6e23-effe-480e-a9c1-27be8fbbcde2 --- 07fb6e23-effe-480e-a9c1-27be8fbbcde2_no["No"]
07fb6e23-effe-480e-a9c1-27be8fbbcde2_no --> 00c22ad3-f224-424f-afd7-5b0643307315
00c22ad3-f224-424f-afd7-5b0643307315 --- 00c22ad3-f224-424f-afd7-5b0643307315_yes["Yes"]
00c22ad3-f224-424f-afd7-5b0643307315_yes --> 855e9167-faee-4621-8e7c-8ab8c6dbcda1
00c22ad3-f224-424f-afd7-5b0643307315 --- 00c22ad3-f224-424f-afd7-5b0643307315_no["No"]
00c22ad3-f224-424f-afd7-5b0643307315_no --> a1a999dc-c8fd-4490-a377-54ceaca1af5e
b96039cd-bf7e-4c81-bbc3-c25fe567137e_yes@{ shape: text}
b96039cd-bf7e-4c81-bbc3-c25fe567137e_no@{ shape: text}
8f854a85-d68e-49a3-8a23-8e777569b805_yes@{ shape: text}
8f854a85-d68e-49a3-8a23-8e777569b805_no@{ shape: text}
07fb6e23-effe-480e-a9c1-27be8fbbcde2_yes@{ shape: text}
dea0eff3-fa1c-49ad-abc7-0a5831b07abe_yes@{ shape: text}
dea0eff3-fa1c-49ad-abc7-0a5831b07abe_no@{ shape: text}
07fb6e23-effe-480e-a9c1-27be8fbbcde2_no@{ shape: text}
00c22ad3-f224-424f-afd7-5b0643307315_yes@{ shape: text}
00c22ad3-f224-424f-afd7-5b0643307315_no@{ shape: text}
style abee2c23-b910-4730-97ea-e182240d664b stroke-width:4px,stroke-dasharray: 0,stroke:#00C853`;

export const Mermaid = ({ chart }: MermaidProps) => {
  const [svgUrl, setSvgUrl] = useState<string | null>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const renderMermaid = async () => {
      if (!chart) return;

      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
        });

        const { svg } = await mermaid.render("mermaidContainer", chart);
        const dataUrl = `data:image/svg+xml;base64,${btoa(
          decodeURIComponent(encodeURIComponent(svg))
        )}`;

        setSvgUrl(dataUrl);
        // if (containerRef.current) {
        //   containerRef.current.innerHTML = svg;
        // }
      } catch (error) {
        console.error("Mermaid rendering error:", error);
      }
    };

    renderMermaid();
  }, [chart]);

  useEffect(() => {
    if (svgUrl) {
      const viewer = new Viewer(
        document.getElementById("diagram-img") as HTMLElement,
        {
          inline: false,
          toolbar: {
            zoomIn: true,
            zoomOut: true,
            oneToOne: true,
          },
          viewed() {
            viewer.zoomTo(3);
          },
          hidden() {
            viewer.destroy();
          },
        }
      ).show();
    }
  }, [svgUrl]);

  return (
    <div>
      <div>
        {svgUrl && (
          <img
            id="diagram-img"
            style={{ display: "none" }}
            src={svgUrl}
            alt="Mermaid Diagram"
          />
        )}
      </div>
    </div>
  );
};
