"use client";

import { filesApi } from "@/api/files";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import { useEffect, useState } from "react";

interface FileNode {
  name: string;
  type: "folder" | "file";
  path: string | null;
  previewUrl: string | null;
  downloadUrl: string | null;
  children: FileNode[];
}

interface TreeNodeProps {
  node: FileNode;
  level: number;
  // expandedNodes: Set<string>;
  // onToggle: (path: string) => void;
  onSelectFolder: (node: FileNode) => void;
  // selectedFolder: string | null;
}

function TreeNode({
  node,
  level,
  onSelectFolder,
}: // expandedNodes,
// onToggle,
// onSelectFolder,
// selectedFolder,
TreeNodeProps) {
  const nodePath = node.path || node.name;
  console.log("Rendering node:", nodePath);
  const isExpanded = true;
  const isSelected = true;

  if (node.type === "file") {
    return (
      <div
        className={`flex items-center gap-2 py-1 px-2 text-sm text-muted-foreground`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <File className="h-4 w-4" />
        <span>{node.name}</span>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        className={`w-full justify-start gap-2 py-1 px-2 h-auto font-normal ${
          isSelected ? "bg-accent" : ""
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => {
          // onToggle(nodePath);
          onSelectFolder(node);
        }}
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        <Folder className="h-4 w-4" />
        <span className="text-sm">{node.name}</span>
      </Button>
      {isExpanded &&
        node.children.map((child, index) => (
          <TreeNode
            key={`${child.name}-${index}`}
            node={child}
            level={level + 1}
            onSelectFolder={onSelectFolder}
            // expandedNodes={expandedNodes}
            // onToggle={onToggle}
            // onSelectFolder={onSelectFolder}
            // selectedFolder={selectedFolder}
          />
        ))}
    </div>
  );
}

function collectFiles(node: FileNode): FileNode[] {
  let files: FileNode[] = [];

  if (node.type === "file" && node.previewUrl) {
    files.push(node);
  }

  for (const child of node.children) {
    files = files.concat(collectFiles(child));
  }

  return files;
}

export default function FilesPage() {
  const [huj, setHuj] = useState<FileNode | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<FileNode | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await filesApi();
        setHuj(res);
      } catch (err) {
        console.error("No i zjebało się pobieranie plików:", err);
      }
    };

    fetchFiles();
  }, []);

  const handleSelectFolder = (node: FileNode) => {
    setSelectedFolder(node);
  };

  const displayFiles = selectedFolder
    ? collectFiles(selectedFolder)
    : huj
    ? collectFiles(huj)
    : [];

  return (
    <div className="flex h-screen bg-background">
      <div className="w-80 border-r bg-sidebar">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            Kategorie
          </h2>
        </div>
        <div className="p-2">
          {huj &&
            huj.children.map((child, index) => (
              <TreeNode
                key={`${child.name}-${index}`}
                node={child}
                level={0}
                // expandedNodes={expandedNodes}
                // onToggle={handleToggle}
                onSelectFolder={handleSelectFolder}
                // selectedFolder={
                //   selectedFolder?.path || selectedFolder?.name || null
                // }
              />
            ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">
            {selectedFolder ? selectedFolder.name : "Wszystkie pliki"}
          </h1>
          <p className="text-muted-foreground">
            {displayFiles.length}{" "}
            {displayFiles.length === 1 ? "plik" : "plików"}
          </p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayFiles.map((file, index) => (
                <Card
                  key={`${file.path}-${index}`}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    {file.previewUrl ? (
                      <img
                        src={file.previewUrl || "/placeholder.svg"}
                        alt={file.name}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <File className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <div className="p-3">
                    <h3
                      className="font-medium text-sm truncate"
                      title={file.name}
                    >
                      {file.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {file.path?.split("/").slice(-2, -1)[0] || "Root"}
                    </p>
                    {file.downloadUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 bg-transparent"
                        onClick={() => {
                          // window.open(file.downloadUrl!, "_blank");
                          if (window.sketchup) {
                            window.sketchup.import_file(file.downloadUrl!);
                          } else {
                            console.error("SketchUp plugin is not available.");
                          }
                        }}
                      >
                        Pobierz
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {displayFiles.length === 0 && (
              <div className="text-center py-12">
                <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Brak plików w wybranej kategorii
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
