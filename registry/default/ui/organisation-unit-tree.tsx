"use client";

import type React from "react";

import { useCallback, useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Users, ChevronDown, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Interface for tree node data structure
 */
export interface TreeNode {
  /** Unique identifier for the node */
  id: string;
  /** Display name of the node */
  name: string;
  /** Hierarchical level (0 = root) */
  level?: number;
  /** Parent node ID, null for root nodes */
  parentId?: string | null;
  /** Child nodes array */
  children?: TreeNode[];
  /** Indicates if node has children (for lazy loading) */
  hasChildren?: boolean;
  /** Loading state for lazy loading */
  isLoading?: boolean;
  /** Whether children have been loaded */
  isLoaded?: boolean;
  /** Allow additional properties */
  [key: string]: any;
}

/**
 * Props for the OrganizationTree component
 */
export interface OrganizationTreeProps {
  /** Tree data array */
  data: TreeNode[];
  /** Callback when selection changes */
  onSelectionChange?: (selectedNodes: TreeNode[], selectedIds: string[]) => void;
  /** Callback when search term changes */
  onSearchChange?: (searchTerm: string) => void;
  /** Initially selected node IDs */
  initialSelected?: string[];
  /** Enable single selection mode */
  singleSelection?: boolean;
  /** Show search and controls */
  showControls?: boolean;
  /** Show selection statistics */
  showStats?: boolean;
  /** Array of enabled node IDs (others will be disabled) */
  enabledNodeIds?: string[];
  /** Restrict selection to specific level */
  restrictSelectionToLevel?: number;
  /** Enable lazy loading of children */
  enableLazyLoading?: boolean;
  /** Function to load children for a node */
  onLoadChildren?: (nodeId: string) => Promise<TreeNode[]>;
  /** Additional CSS classes */
  className?: string;
  /** Initially expanded node IDs */
  initiallyExpanded?: string[];
  /** Custom placeholder text for search */
  searchPlaceholder?: string;
}

/**
 * Internal node state for rendering
 */
interface NodeState {
  isExpanded: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isSearchMatch: boolean;
  isDisabled: boolean;
}

/**
 * Search result information
 */
interface SearchResults {
  matchCount: number;
  matchingIds: string[];
}

/**
 * A highly reusable tree component for displaying hierarchical organization units
 * with search, selection, lazy loading, and filtering capabilities.
 *
 * @example
 * \`\`\`tsx
 * const data = [
 *   {
 *     id: "1",
 *     name: "Root Organization",
 *     level: 0,
 *     children: [
 *       { id: "2", name: "Department A", level: 1, parentId: "1" },
 *       { id: "3", name: "Department B", level: 1, parentId: "1" }
 *     ]
 *   }
 * ];
 *
 * <OrganizationTree
 *   data={data}
 *   onSelectionChange={(nodes, ids) => console.log('Selected:', ids)}
 *   singleSelection={true}
 *   showControls={true}
 *   showStats={true}
 * />
 * \`\`\`
 */
export function OrganizationTree({
  data,
  onSelectionChange,
  onSearchChange,
  initialSelected = [],
  singleSelection = false,
  showControls = true,
  showStats = true,
  enabledNodeIds,
  restrictSelectionToLevel,
  enableLazyLoading = false,
  onLoadChildren,
  className,
  initiallyExpanded = [],
  searchPlaceholder = "Search organization units...",
}: OrganizationTreeProps) {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelected);
  const [expandedIds, setExpandedIds] = useState<string[]>(initiallyExpanded);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [treeData, setTreeData] = useState<TreeNode[]>(data);

  // Update tree data when prop changes
  useEffect(() => {
    setTreeData(data);
  }, [data]);

  /**
   * Flattens tree structure for easier searching and processing
   */
  const flattenedNodes = useMemo(() => {
    const flatten = (nodes: TreeNode[], level = 0): TreeNode[] => {
      return nodes.reduce((acc, node) => {
        const nodeWithLevel = { ...node, level: node.level ?? level };
        acc.push(nodeWithLevel);
        if (node.children && node.children.length > 0) {
          acc.push(...flatten(node.children, level + 1));
        }
        return acc;
      }, [] as TreeNode[]);
    };
    return flatten(treeData);
  }, [treeData]);

  /**
   * Search functionality with highlighting
   */
  const searchResults = useMemo((): SearchResults => {
    if (!searchTerm.trim()) {
      return { matchCount: 0, matchingIds: [] };
    }

    const searchLower = searchTerm.toLowerCase();
    const matchingNodes = flattenedNodes.filter(
      (node) => node.name.toLowerCase().includes(searchLower) || node.id.toLowerCase().includes(searchLower),
    );

    return {
      matchCount: matchingNodes.length,
      matchingIds: matchingNodes.map((node) => node.id),
    };
  }, [searchTerm, flattenedNodes]);

  /**
   * Find node by ID in the tree
   */
  const findNodeById = useCallback(
    (nodeId: string): TreeNode | null => {
      return flattenedNodes.find((node) => node.id === nodeId) || null;
    },
    [flattenedNodes],
  );

  /**
   * Get selected nodes from IDs
   */
  const selectedNodes = useMemo(() => {
    return selectedIds.map((id) => findNodeById(id)).filter(Boolean) as TreeNode[];
  }, [selectedIds, findNodeById]);

  /**
   * Handle node selection
   */
  const handleNodeSelect = useCallback(
    (nodeId: string) => {
      setSelectedIds((prev) => {
        let newSelected: string[];

        if (singleSelection) {
          newSelected = prev.includes(nodeId) ? [] : [nodeId];
        } else {
          newSelected = prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId];
        }

        // Return updated selection
        return newSelected;
      });
    },
    [singleSelection],
  );

  useEffect(() => {
    if (onSelectionChange) {
      const newSelectedNodes = selectedIds.map((id) => findNodeById(id)).filter(Boolean) as TreeNode[];
      onSelectionChange(newSelectedNodes, selectedIds);
    }
  }, [selectedIds]); // Removed findNodeById and onSelectionChange from dependencies

  /**
   * Handle node expansion/collapse
   */
  const handleNodeToggle = useCallback(
    async (nodeId: string) => {
      const isExpanded = expandedIds.includes(nodeId);

      if (isExpanded) {
        // Collapse
        setExpandedIds((prev) => prev.filter((id) => id !== nodeId));
      } else {
        // Expand
        setExpandedIds((prev) => [...prev, nodeId]);

        // Load children if lazy loading is enabled
        if (enableLazyLoading && onLoadChildren) {
          const node = findNodeById(nodeId);
          if (node && !node.isLoaded && !loadingIds.has(nodeId)) {
            setLoadingIds((prev) => new Set(prev).add(nodeId));

            try {
              const children = await onLoadChildren(nodeId);

              // Update tree data with loaded children
              setTreeData((prevData) => {
                const updateNode = (nodes: TreeNode[]): TreeNode[] => {
                  return nodes.map((node) => {
                    if (node.id === nodeId) {
                      return {
                        ...node,
                        children: children,
                        isLoaded: true,
                        isLoading: false,
                      };
                    }
                    if (node.children) {
                      return {
                        ...node,
                        children: updateNode(node.children),
                      };
                    }
                    return node;
                  });
                };
                return updateNode(prevData);
              });
            } catch (error) {
              console.error("Failed to load children for node:", nodeId, error);
            } finally {
              setLoadingIds((prev) => {
                const next = new Set(prev);
                next.delete(nodeId);
                return next;
              });
            }
          }
        }
      }
    },
    [expandedIds, enableLazyLoading, onLoadChildren, findNodeById, loadingIds],
  );

  /**
   * Handle search input change
   */
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      onSearchChange?.(value);
    },
    [onSearchChange],
  );

  /**
   * Clear search
   */
  const clearSearch = useCallback(() => {
    setSearchTerm("");
    onSearchChange?.("");
  }, [onSearchChange]);

  /**
   * Clear all selections
   */
  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  /**
   * Check if node should be disabled
   */
  const isNodeDisabled = useCallback(
    (node: TreeNode): boolean => {
      // Check enabled IDs filter
      if (enabledNodeIds && enabledNodeIds.length > 0) {
        if (!enabledNodeIds.includes(node.id)) {
          return true;
        }
      }

      // Check level restriction
      if (restrictSelectionToLevel !== undefined) {
        if (node.level !== restrictSelectionToLevel) {
          return true;
        }
      }

      return false;
    },
    [enabledNodeIds, restrictSelectionToLevel],
  );

  /**
   * Render individual tree node
   */
  const renderNode = useCallback(
    (node: TreeNode, level = 0): React.ReactNode => {
      const hasChildren = enableLazyLoading
        ? node.hasChildren || (node.children && node.children.length > 0)
        : node.children && node.children.length > 0;

      const isExpanded = expandedIds.includes(node.id);
      const isSelected = selectedIds.includes(node.id);
      const isSearchMatch = searchResults.matchingIds.includes(node.id);
      const isDisabled = isNodeDisabled(node);
      const isLoading = loadingIds.has(node.id);

      return (
        <div key={node.id}>
          <div
            className={cn(
              "flex items-center py-2 px-2 rounded-md transition-colors",
              "hover:bg-accent/50",
              isSelected && "bg-primary/10 border-l-4 border-primary",
              isSearchMatch && "bg-yellow-100 dark:bg-yellow-900/20",
              isDisabled && "opacity-50 cursor-not-allowed",
              !isDisabled && "cursor-pointer",
            )}
            style={{ paddingLeft: `${level * 20 + 8}px` }}
            onClick={() => !isDisabled && handleNodeSelect(node.id)}
          >
            {/* Expand/Collapse Button */}
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-6 w-6 mr-2"
              onClick={(e) => {
                e.stopPropagation();
                if (hasChildren) {
                  handleNodeToggle(node.id);
                }
              }}
              disabled={!hasChildren || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : hasChildren ? (
                isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )
              ) : (
                <div className="w-4 h-4" />
              )}
            </Button>

            {/* Node Content */}
            <div className="flex items-center flex-1 min-w-0">
              <Users className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
              <span className={cn("text-sm truncate", isSearchMatch && "font-semibold", isSelected && "font-medium")}>
                {node.name}
              </span>
            </div>
          </div>

          {/* Render Children */}
          {isExpanded && node.children && node.children.length > 0 && (
            <div>{node.children.map((child) => renderNode(child, level + 1))}</div>
          )}
        </div>
      );
    },
    [
      expandedIds,
      selectedIds,
      searchResults.matchingIds,
      isNodeDisabled,
      loadingIds,
      enableLazyLoading,
      handleNodeSelect,
      handleNodeToggle,
    ],
  );

  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center text-muted-foreground">
            <Users className="h-8 w-8 mx-auto mb-2" />
            <p>No organization units available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Controls */}
      {showControls && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-8"
              />
              {searchTerm && (
                <Button variant="ghost" size="sm" className="absolute right-1 top-1 h-6 w-6 p-0" onClick={clearSearch}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Statistics */}
          {showStats && (
            <div className="flex flex-wrap gap-2">
              {selectedIds.length > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Selected: {selectedIds.length}</Badge>
                  <Button variant="ghost" size="sm" onClick={clearSelection} className="h-6 px-2 text-xs">
                    Clear
                  </Button>
                </div>
              )}

              {searchTerm && searchResults.matchCount > 0 && (
                <Badge variant="secondary">Found: {searchResults.matchCount} matches</Badge>
              )}
            </div>
          )}

          {/* Selected Items */}
          {showStats && selectedNodes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedNodes.map((node) => (
                <Badge key={node.id} variant="secondary" className="text-xs">
                  {node.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleNodeSelect(node.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tree */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-1">{treeData.map((node) => renderNode(node, 0))}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrganizationTree;
