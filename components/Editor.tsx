"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { PartialBlock } from "@blocknote/core";
import { useEffect } from "react";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (content: PartialBlock[]) => void; // Updated to use PartialBlock[] type
    initialContent?: PartialBlock[];
    editable?: boolean; // Determines if the editor is editable
}

export const Editor = ({ editable = true, onChange, initialContent }: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });
        return response.url;
    };

    // Initialize the editor only if initialContent is provided and non-empty
    const editor = useCreateBlockNote({
        ...(initialContent ? { initialContent } : {}),
        uploadFile: handleUpload,
    });

    useEffect(() => {
        if (editor) {
            const unsubscribe = editor.onChange(() => {
                onChange(editor.document); // Send updated content to onChange prop
            });
            return unsubscribe;
        }
    }, [editor, onChange]);

    return (
        <div
            className={`editor-container ${!editable ? "readonly" : ""}`}
            style={!editable ? { pointerEvents: "none", opacity: 0.6 } : {}}
        >
            <BlockNoteView 
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                editor={editor}
            />
        </div>
    );
};















































// "use client";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import { useTheme } from "next-themes";
// import { PartialBlock } from "@blocknote/core";
// import { useEffect } from "react";
// import { useEdgeStore } from "@/lib/edgestore";

// interface EditorProps {
//     onChange: (content: PartialBlock[]) => void; // Updated to use PartialBlock[] type
//     initialContent?: PartialBlock[];
//     editable?:boolean
// }

// export const Editor = ({editable, onChange, initialContent }: EditorProps) => {
//     const { resolvedTheme } = useTheme();
//     const { edgestore } = useEdgeStore();

//     const handleUpload = async (file: File) => {
//         const response = await edgestore.publicFiles.upload({
//             file
//         });
//         return response.url;
//     };

//     // Initialize the editor only if initialContent is provided and non-empty
//     const editor = useCreateBlockNote({
//         ...(initialContent ? { initialContent } : {}),
//         uploadFile: handleUpload,
//     });

//     useEffect(() => {
//         if (editor) {
//             const unsubscribe = editor.onChange(() => {
//                 onChange(editor.document); // Send updated content to onChange prop
//             });
//             return unsubscribe;
//         }
//     }, [editor, onChange]);

//     return (
//         <div>
//             <BlockNoteView 
//                 theme={resolvedTheme === "dark" ? "dark" : "light"}
//                 editor={editor}
//             />
//         </div>
//     );
// };
