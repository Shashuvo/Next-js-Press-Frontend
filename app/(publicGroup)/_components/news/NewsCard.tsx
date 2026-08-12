
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPost } from "@/lib/types";
import { MessageSquareIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";

type NewsCardProps = {
  post: IPost
}

export function NewsCard({ post }: NewsCardProps) {
  const commentCount = post._count?.comments ?? post.comments?.length ?? 0;


  return (
    <Card className="gap-4">
      {post.thumbNail ? (
        <Image
          src={post.thumbNail}
          unoptimized
          alt={post.title}
          width={400}
          height={300}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-muted text-sm text-muted-foreground">
          No image
        </div>
      )}
      <CardHeader>
        <div className="flex flex-wrap items-center gap-1.5">
          {post.isPremium && (
            <Badge variant="default">
              <SparklesIcon data-icon="inline-start" />
              Premium
            </Badge>
          )}
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-lg">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="line-clamp-4 whitespace-pre-line text-muted-foreground">
          {post.content}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            By {post.author?.name ?? "Unknown"} ·{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquareIcon className="size-3.5" />
            {commentCount}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}