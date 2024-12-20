"use client"

import { cn } from "@/lib/utils"
import  Image from "next/image"
import { Button } from "./ui/button"
import { ImageIcon, X } from "lucide-react"
import { useCoverImage } from "@/hooks/use-cover-image"
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react"
import { useParams } from "next/navigation"
import { Skeleton } from "./ui/skeleton"

interface CoverImageProps {
    url?:string,
    preview?:boolean
}

export const Cover = ({url,preview}:CoverImageProps) => {
    const coverImage = useCoverImage()
    const { edgestore } = useEdgeStore();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);
    const params = useParams()
    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url
            })
        }
        removeCoverImage({
            id: params.documentId as Id<"documents">
        });
    };


    return (
        <div className={cn("relative w-full h-[35vh] group", !url && "h-[12vh]", url && "bg-muted") }>
        
        {!!url && (
            <Image src={url}  fill  alt={"Cover"} className="object-cover"/>
        )}
{
    url && !preview && (
        <div className="absolute  opacity-0 group-hover:opacity-100 right-5 flex items-center gap-x-2 bottom-5">
            <Button
            onClick={() => coverImage.onReplace(url)}
            variant="outline"
            size="sm"
            >
                <ImageIcon className="h-4 w-4 mr-2"/>
                Change Cover
            </Button>
            <Button
            onClick={onRemove}
            variant="outline"
            size="sm"
            >
                <X className="h-4 w-4 mr-2"/>
                Remove Cover
            </Button>
            </div>
    )
}

        </div>
    )
}

Cover.Skeleton = function CoverSkeletion(){
return (
    <Skeleton className="w-full h-[12vh]">

    </Skeleton>
)
}