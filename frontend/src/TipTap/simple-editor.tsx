import * as React from "react"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Underline } from "@tiptap/extension-underline"

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-extension/link-extension"
import { Selection } from "@/components/tiptap-extension/selection-extension"
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension"

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Spacer } from "@/components/tiptap-ui-primitive/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { NodeButton } from "@/components/tiptap-ui/node-button"
import {
  HighlightPopover,
  HighlighterButton,
} from "@/components/tiptap-ui/highlight-popover"
import {
  LinkPopover,
  LinkButton,
} from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button"

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon"
import { LinkIcon } from "@/components/tiptap-icons/link-icon"

// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile"
import { useWindowSize } from "@/hooks/use-window-size"

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"

// --- Styles ---
import fs from 'fs';  // You'll need to handle this import based on your environment

import content from "@/TipTap/data/content.json"

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
  saveContent,
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
  saveContent: () => void
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <NodeButton type="codeBlock" />
        <NodeButton type="blockquote" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <HighlightPopover colors={[
            {
              label: "Yellow",
              value: "var(--tt-highlight-yellow)",
              border: "var(--tt-highlight-yellow-contrast)",
            }
            
          ]} />
        ) : (
          <HighlighterButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      <ToolbarGroup>
        {/* Save button to manually trigger saving content */}
        <Button data-style="primary" onClick={saveContent}>
          Save
        </Button>
      </ToolbarGroup>
    </>
  )
}

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link"
  onBack: () => void
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {/* {type === "highlighter" ? <HighlightContent colors={[
    {
      label: "Black",
      value: "transparent", // No background color
      border: "transparent",
    }
  ]}  /> : <LinkContent />} */}
  </>
)

export function SimpleEditor() {
  const isMobile = useMobile()
  const windowSize = useWindowSize()
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main")
  const [rect, setRect] = React.useState({ y: 0 })

  React.useEffect(() => {
    setRect(document.body.getBoundingClientRect())
  }, [])

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({
        
      }),
      // Configure the Image extension with specific rendering options
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'tiptap-image',
          loading: 'lazy'
          // // Ensure images are visible with proper styling
          // style: 'max-width: 100%; height: auto; display: block; margin: 1rem 0;'
        },
      }),
      Typography,
      Superscript,
      Subscript,

      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
        renderImage: (props) => {
          // Custom rendering function to ensure image is displayed properly
          return `<img src="${props.src}" alt="${props.alt || ''}" class="tiptap-image" style="max-width: 100%; height: auto; display: block; margin: 1rem 0; border-radius: 4px;" />`;
        },
        // This is the important part:
        onUploadSuccess: (result, editor) => {
          if (result && result.src) {
            // Insert using the core editor commands rather than a custom node
            editor.chain().focus().setImage({ 
              src: result.src, 
              alt: result.alt || 'Uploaded image',
            }).run();
            
            // Force refresh by triggering a state update
            setTimeout(() => {
              editor.commands.focus();
            }, 100);
          }
        }
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
    ],
    content: content,
    // Add an onUpdate handler to capture content changes
    // Add this to your editor's onUpdate handler
onUpdate: ({ editor }) => {
  const jsonContent = editor.getJSON();
  
  // Debug: Check for image nodes and log their URLs
  const images = [];
  const processNode = (node) => {
    if (node.type === 'image' && node.attrs?.src) {
      images.push(node.attrs.src);
    }
    if (node.content) {
      node.content.forEach(processNode);
    }
  };
  
  if (jsonContent.content) {
    jsonContent.content.forEach(processNode);
  }
  
  if (images.length > 0) {
    console.log('Images in document:', images);
  }
  
  localStorage.setItem('tiptap-content', JSON.stringify(jsonContent));
}
  })

  // Function to save content back to content.json
  const saveContentToFile = async () => {
    if (!editor) return;
    
    const jsonContent = editor.getJSON();
    
    // In a browser environment, you'll need a server endpoint to handle file saving
    // This is a simplified example assuming you have an API endpoint
    try {
      // Option 1: Using fetch to save to server API endpoint
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonContent),
      });
      
      if (response.ok) {
        alert('Content saved successfully!');
      } else {
        alert('Failed to save content.');
      }
      
      // Option 2: If you're in a Node.js environment (Next.js, etc.)
      // You'd handle this in your API route
      /*
      fs.writeFileSync(
        './public/TipTap/data/content.json', 
        JSON.stringify(jsonContent, null, 2)
      );
      */
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content: ' + error.message);
    }
  };

  // Load content from localStorage if available when component mounts
  React.useEffect(() => {
    if (editor) {
      const savedContent = localStorage.getItem('tiptap-content');
      if (savedContent) {
        try {
          const parsedContent = JSON.parse(savedContent);
          editor.commands.setContent(parsedContent);
        } catch (e) {
          console.error('Error parsing saved content:', e);
        }
      }
    }
  }, [editor]);

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar
        style={
        isMobile
          ? {
              bottom: `calc(100% - ${windowSize.height - rect.y}px)`,
              borderBottom: '1px solid var(--border-color, #e1e4e8)',
              padding: '8px 0',
              backgroundColor: '#000000',
            }
          : {
              borderBottom: '1px solid var(--border-color, #e1e4e8)',
              padding: '10px',
              backgroundColor: '#000000',
            }
        }
      >
        {mobileView === "main" ? (
          <MainToolbarContent
            onHighlighterClick={() => setMobileView("highlighter")}
            onLinkClick={() => setMobileView("link")}
            isMobile={isMobile}
            saveContent={saveContentToFile}
          />
        ) : (
          <MobileToolbarContent
            type={mobileView === "highlighter" ? "highlighter" : "link"}
            onBack={() => setMobileView("main")}
          />
        )}
      </Toolbar>
  
      <div className="h-[calc(100%-64px)] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 mt-5 mb-5">
        <EditorContent
          editor={editor}
          role="presentation"
          className="max-w-5xl w-full mx-auto [&_.tiptap.ProseMirror]:p-8 md:[&_.tiptap.ProseMirror]:p-4 md:[&_.tiptap.ProseMirror]:px-6 font-['DM_Sans'] bg-[#111111] 
          rounded-lg p-4"
        />
      </div>
      
      {/* Add image-specific CSS to ensure images are properly displayed */}
      <style>{`
        .tiptap-image {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1rem 0;
          border-radius: 4px;
        }
        
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1rem 0;
          border-radius: 4px;
        }
      `}</style>
    </EditorContext.Provider>
  )
}