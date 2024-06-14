import React, { forwardRef, useEffect, useRef, useState } from "react";
import FilerobotImageEditor, {
  FilerobotImageEditorConfig,
} from "react-filerobot-image-editor";

interface CustomizableImageEditorProps extends FilerobotImageEditorConfig {
  source: string;
  onSquareDrawn?: (coordinates: { x: number; y: number; size: number }) => void;
}

const CustomizableImageEditor = forwardRef<
  typeof FilerobotImageEditor,
  CustomizableImageEditorProps
>(({ onSquareDrawn, ...rest }, ref) => {
  const editorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("hello", editorRef.current);
    if (editorRef.current && onSquareDrawn) {
      editorRef.current.extendWith({
        drawSquare: (x: number, y: number, size: number) => {
          const context = editorRef.current.canvas.getContext("2d");
          context.beginPath();
          context.rect(x, y, size, size);
          context.lineWidth = 2;
          context.strokeStyle = "red";
          context.stroke();

          onSquareDrawn({ x, y, size });
        },
      });
    }
  }, [onSquareDrawn]);

  const handleDrawSquare = () => {
    if (editorRef.current) {
      editorRef.current.drawSquare(100, 100, 50);
    }
  };

  return (
    <div style={{ height: "600px" }}>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && (
        <>
          <FilerobotImageEditor
            // ref={ref}
            {...rest}
            savingPixelRatio={1}
            previewPixelRatio={1}
          />
          <button onClick={handleDrawSquare}>Draw Square</button>
        </>
      )}
    </div>
  );
});

export default CustomizableImageEditor;
