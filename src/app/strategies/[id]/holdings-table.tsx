"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate, stringCompare } from "@/lib/utils";
import { IconCopy, IconPhoto } from "@tabler/icons-react";
import mermaid from "mermaid";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

interface HoldingsTableProps {
  holdings: Array<{ [key: string]: any }>;
}

export const HoldingsTable = ({ holdings }: HoldingsTableProps) => {
  const [diagramSvgUrl, setDiagramSvgUrl] = useState<string | null>(null);
  const [inAppDiagramView] = useLocalStorage("inAppDiagramView", false, {
    initializeWithValue: false,
  });
  const tableHeads = Object.keys(holdings[0] || {}).filter(
    (k) => !stringCompare(k, "Diagram")
  );

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
    });
  }, []);

  tableHeads.splice(1, 0, "Diagram");

  const handleViewClick = (index: number) => {
    const chart = JSON.parse(holdings[index]["Diagram"]);
    mermaid.render("marmaid-diagram" + index, chart).then(({ svg }) => {
      const svgText = svg;
      const svgBlob = new Blob([svgText], {
        type: "image/svg+xml;charset=utf-8",
      });
      const blobUrl = URL.createObjectURL(svgBlob);
      setDiagramSvgUrl(blobUrl);
      if (inAppDiagramView !== null && inAppDiagramView == false) {
        window.open(blobUrl, "_blank");
        return;
      }
    });
  };

  useEffect(() => {
    if (inAppDiagramView && diagramSvgUrl) {
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
            viewer.zoomTo(5);
          },
          hidden() {
            viewer.destroy();
          },
        }
      ).show();
    }
  }, [diagramSvgUrl, inAppDiagramView]);

  const copyMermaidCode = (index: number) => {
    const chart = JSON.parse(holdings[index]["Diagram"]);
    navigator.clipboard.writeText(chart);
    toast("Mermaid code copied to clipboard");
  };

  const tableCellDisplay = (head: string, holding: any, index: number) => {
    if (stringCompare(head, "Date")) {
      return formatDate(holding[head]);
    }

    if (stringCompare(head, "Diagram")) {
      return (
        <div className="flex flex-row gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="hover:opacity-60 rounded-2xl border border-gray-400 dark:border-gray-600"
                onClick={() => handleViewClick(index)}
              >
                <IconPhoto />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View logic diagram</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="hover:opacity-60 rounded-2xl border border-gray-400 dark:border-gray-600"
                onClick={() => copyMermaidCode(index)}
              >
                <IconCopy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy Mermaid code</TooltipContent>
          </Tooltip>
        </div>
      );
    }

    if (parseFloat(holding[head]) === 0) {
      return <span className="text-muted">-</span>;
    }

    return `${holding[head]}%`;
  };

  const tableBodyRows = holdings.map((holding: any, index) => {
    return (
      <TableRow key={index}>
        {tableHeads.map((head) => {
          return (
            <TableCell
              className="border border-gray-300 p-2 dark:border-gray-700"
              key={head + `${index}`}
            >
              {tableCellDisplay(head, holding, index)}
            </TableCell>
          );
        })}
      </TableRow>
    );
  });
  return (
    <div className="h-[83vh] relative overflow-auto">
      <Table>
        <TableCaption>A list of your recent holdings.</TableCaption>
        <TableHeader className="sticky top-0">
          <TableRow>
            {tableHeads.map((head) => (
              <TableHead
                key={head}
                className="sticky border-r-1 border-gray-300 bg-gray-100 font-semibold w-16 dark:bg-neutral-800 dark:border-gray-700 text-sm"
              >
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{tableBodyRows}</TableBody>
      </Table>
      {diagramSvgUrl && (
        <img
          id="diagram-img"
          src={diagramSvgUrl}
          style={{ display: "none" }}
          alt="Mermaid Diagram"
        />
      )}
    </div>
  );
};
