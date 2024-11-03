"use client";

import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Editor } from "@/components/Editor";
import { api } from "@/convex/_generated/api";
import { PartialBlock } from "@blocknote/core";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    });

    const updateDocument = useMutation(api.documents.update);

    // Update the document's content in Convex when the editor content changes
    const handleEditorChange = (content: PartialBlock[]) => {
        updateDocument({ id: params.documentId, content: JSON.stringify(content) });
    };

    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
                    </div>
                </div>
            </div>
        );
    }

    if (document === null) {
        return <div>Not found</div>;
    }

    // Parse the initial content if available
    const initialContent = document.content ? JSON.parse(document.content) : undefined;

    return (
        <div className="pb-40">
            <Cover preview url={document.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar preview initialData={document} />
                <Editor 
                    editable={false}
                    onChange={handleEditorChange} 
                    initialContent={initialContent} 
                />
            </div>
        </div>
    );
};

export default DocumentIdPage;
