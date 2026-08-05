/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewsCard } from './NewsCard'
import { IPost } from '@/lib/types';
import { getPremiumNews } from '../../_actions/getPremiumNews';

const PremiumNewsList = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {

  const query = await searchParams;


  const result = await getPremiumNews({ query });


  if (!result.success || !result.data?.data.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No premium news found.
      </p>
    );
  }


  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.data?.data.map((post: IPost | any) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default PremiumNewsList
