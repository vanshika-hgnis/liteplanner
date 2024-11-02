
"use client"
"use client";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Toolbar } from "@/components/toolbar";


interface DocumentIdPageProps {
  params: {
      documentId: Id<"documents">;
  };
};



const DocumentIdPage = ({params}:DocumentIdPageProps) => {

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId
});

const update = useMutation(api.documents.update);

const onChange = (content: string) => {
    update({
        id: params.documentId,
        content
    });
};

if(document === undefined){
  return <div>
<Cover.Skeleton/>
<div className="md:max-2-3xl lg:max-w-4xll mx-auto">
<div className="space-y-4 pl-8 pt-4">
<Skeleton className="h-14 w-[50p%]"/>
<Skeleton className="h-4 w-[80p%]"/>
<Skeleton className="h-4 w-[40p%]"/>
<Skeleton className="h-4 w-[60p%]"/>
</div>
</div>
  </div>
}



if(document === null){
  return <div>Not Found</div>
}
  return (
    <div className="pb-40">
      {/* <div  className="h-[35vh]"></div> */}
      <Cover url={document.coverImage}/>
          <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
<Toolbar initialData={document}/>
    </div>
    </div>

  )
}
export default DocumentIdPage