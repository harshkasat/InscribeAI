import * as React from "react";
import { isNodeSelection, type Editor } from "@tiptap/react";

// --- Hooks ---
import { useMenuNavigation } from "@/hooks/use-menu-navigation";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// --- Icons ---
import { BanIcon } from "@/TipTap/tiptap-icons/ban-icon";
import { HighlighterIcon } from "@/TipTap/tiptap-icons/highlighter-icon";

// --- Lib ---
import { isMarkInSchema } from "@/lib/tiptap-utils";

// --- UI Primitives ---
import { Button, ButtonProps } from "@/TipTap/tiptap-ui-primitive/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/TipTap/tiptap-ui-primitive/popover";
import { Separator } from "@/TipTap/tiptap-ui-primitive/separator";

// --- Styles ---
import "@/TipTap/tiptap-ui/highlight-popover/highlight-popover.scss";

export interface HighlightColor {
  label: string;
  value: string;
  border?: string;
}

export interface HighlightContentProps {
  editor?: Editor | null;
  colors?: HighlightColor[];
  activeNode?: number;
}

export const DEFAULT_HIGHLIGHT_COLORS: HighlightColor[] = [
  {
    label: "Green",
    value: "rgba(144, 238, 144, 0.9)", // lightgreen bg
    border: "rgba(0, 128, 0, 0.6)",    // darkgreen border
  },
  {
    label: "Blue",
    value: "rgba(173, 216, 230, 0.9)", // lightblue bg
    border: "rgba(30, 144, 255, 0.6)", // dodgerblue border
  },
  {
    label: "Red",
    value: "rgba(255, 182, 193, 0.9)", // lightpink bg
    border: "rgba(220, 20, 60, 0.6)",  // crimson border
  },
  {
    label: "Purple",
    value: "rgba(216, 191, 216, 0.9)", // thistle bg
    border: "rgba(128, 0, 128, 0.6)",  // purple border
  },
  {
    label: "Yellow",
    value: "rgba(255, 255, 153, 0.9)", // lightyellow bg
    border: "rgba(204, 204, 0, 0.6)",  // darker yellow border
  },
];

export const useHighlighter = (editor: Editor | null) => {
  const markAvailable = isMarkInSchema("highlight", editor);

  const getActiveColor = React.useCallback(() => {
    if (!editor) return null;
    if (!editor.isActive("highlight")) return null;
    const attrs = editor.getAttributes("highlight");
    return attrs.color || null;
  }, [editor]);

  const toggleHighlight = React.useCallback(
    (color: string) => {
      if (!markAvailable || !editor) return;
      if (color === "none") {
        editor.chain().focus().unsetMark("highlight").run();
      } else {
        editor.chain().focus().toggleMark("highlight", { color }).run();
      }
    },
    [markAvailable, editor]
  );

  return {
    markAvailable,
    getActiveColor,
    toggleHighlight,
  };
};

export const HighlighterButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <Button
      type="button"
      className={className}
      data-style="ghost"
      data-appearance="default"
      role="button"
      tabIndex={-1}
      aria-label="Highlight text"
      tooltip="Highlight"
      ref={ref}
      {...props}
    >
      {children || <HighlighterIcon className="tiptap-button-icon" />}
    </Button>
  );
});

export function HighlightContent({
  editor: providedEditor,
  colors = DEFAULT_HIGHLIGHT_COLORS,
  onClose,
}: {
  editor?: Editor | null;
  colors?: HighlightColor[];
  onClose?: () => void;
}) {
  const editor = useTiptapEditor(providedEditor);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const { getActiveColor, toggleHighlight } = useHighlighter(editor);
  const activeColor = getActiveColor();

  const menuItems = React.useMemo(
    () => [...colors, { label: "Remove highlight", value: "none" }],
    [colors]
  );

  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "both",
    onSelect: (item) => {
      toggleHighlight(item.value);
      onClose?.();
    },
    onClose,
    autoSelectFirstItem: false,
  });

  return (
    <div ref={containerRef} className="tiptap-highlight-content" tabIndex={0}>
      <div className="tiptap-button-group" data-orientation="horizontal">
        {colors.map((color, index) => (
          <Button
            key={color.value}
            type="button"
            role="menuitem"
            data-active-state={activeColor === color.value ? "on" : "off"}
            aria-label={`${color.label} highlight color`}
            tabIndex={index === selectedIndex ? 0 : -1}
            data-style="ghost"
            onClick={() => toggleHighlight(color.value)}
            data-highlighted={selectedIndex === index}
          >
            <span
              className="tiptap-button-highlight"
              style={
                { "--highlight-color": color.value } as React.CSSProperties
              }
            />
          </Button>
        ))}
      </div>

      <Separator />

      <div className="tiptap-button-group">
        <Button
          onClick={() => toggleHighlight("none")}
          aria-label="Remove highlight"
          tabIndex={selectedIndex === colors.length ? 0 : -1}
          type="button"
          role="menuitem"
          data-style="ghost"
          data-highlighted={selectedIndex === colors.length}
        >
          <BanIcon className="tiptap-button-icon" />
        </Button>
      </div>
    </div>
  );
}

export interface HighlightPopoverProps extends Omit<ButtonProps, "type"> {
  /**
   * The TipTap editor instance.
   */
  editor?: Editor | null;
  /**
   * The highlight colors to display in the popover.
   */
  colors?: HighlightColor[];
  /**
   * Whether to hide the highlight popover.
   */
  hideWhenUnavailable?: boolean;
}

export function HighlightPopover({
  editor: providedEditor,
  colors = DEFAULT_HIGHLIGHT_COLORS,
  hideWhenUnavailable = false,
  ...props
}: HighlightPopoverProps) {
  const editor = useTiptapEditor(providedEditor);

  const { markAvailable } = useHighlighter(editor);
  const [isOpen, setIsOpen] = React.useState(false);

  const isDisabled = React.useMemo(() => {
    if (!markAvailable || !editor) {
      return true;
    }

    return (
      editor.isActive("code") ||
      editor.isActive("codeBlock") ||
      editor.isActive("imageUpload")
    );
  }, [markAvailable, editor]);

  const canSetMark = React.useMemo(() => {
    if (!editor || !markAvailable) return false;

    try {
      return editor.can().setMark("highlight");
    } catch {
      return false;
    }
  }, [editor, markAvailable]);

  const isActive = editor?.isActive("highlight") ?? false;

  const show = React.useMemo(() => {
    if (hideWhenUnavailable) {
      if (isNodeSelection(editor?.state.selection) || !canSetMark) {
        return false;
      }
    }

    return true;
  }, [hideWhenUnavailable, editor, canSetMark]);

  if (!show || !editor || !editor.isEditable) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <HighlighterButton
          disabled={isDisabled}
          data-active-state={isActive ? "on" : "off"}
          data-disabled={isDisabled}
          aria-pressed={isActive}
          {...props}
        />
      </PopoverTrigger>

      <PopoverContent aria-label="Highlight colors">
        <HighlightContent
          editor={editor}
          colors={colors}
          onClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}

HighlighterButton.displayName = "HighlighterButton";

export default HighlightPopover;
