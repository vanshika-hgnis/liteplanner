"use  client"

"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";



export const CoverImageModel = () => {


 const update = useMutation(api.documents.update)
 const params = useParams()
    const [file,setFile ] = useState<File>();
    const [isSubmitting,setIsSubmitting] = useState(false)
    const {edgestore} = useEdgeStore()


    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }

const onChange = async(file?:File) => {
    if(file){
        setIsSubmitting(true)
        setFile(file)
    const res = await edgestore.publicFiles.upload({
        file
    })

    await update({
        id:params.documentId as Id<"documents">,
        coverImage:res.url
    });

    onClose();
    }
}

    const coverImage = useCoverImage()
    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">Cover Image</h2>
                </DialogHeader>
                <SingleImageDropzone
                    className="w-full outline-none"
                    disabled={isSubmitting}
                    value={file}
                    onChange={onChange}
                />
            </DialogContent>
        </Dialog>
    )
}