"use client";

import { useTheme } from "next-themes";
import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";
import {
    BlockNoteView,
    useBlockNote
} from "@blocknote/react";
import "@blocknote/core/style.css";

import { useEdgeStore } from "@/lib/edgestore";



interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};


export const Editor = ({onChange,editable,initialContent}:EditorProps) => {

    const {resolvedTheme} = useTheme()
    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent
        : initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        onEditorContentChange: (editor) => {
            onChange(JSON.stringify(editor.topLevelBlocks,null,2))
        },
    })
    
    
    return (

        <div>
            <h1>Editor</h1>
            <BlockNoteView
            editor={editor}
            theme={resolvedTheme === "dark" ? "dark": "light"}
            />

        </div>
    )
}