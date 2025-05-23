// src/components/BlogFilter.jsx
import { createSignal, createMemo, For, createEffect } from 'solid-js';
import BlogCard from './BlogCard';
import type { CollectionEntry } from 'astro:content';

interface Props {
  posts: CollectionEntry<'blog'>[]
  allTags: string[]
}

export default function BlogFilter(props: Props) {
  const [activeTag, setActiveTag] = createSignal('all');

  // Memoized filtered posts based on active tag
  const filteredPosts = createMemo(() => {
    const tag = activeTag();
    console.log("tag: ", tag);
    if (tag === 'all') return props.posts;
    return props.posts.filter(post =>
      post.data.tags && post.data.tags.includes(tag)
    );
  });
  createEffect(() => {
    console.log("before filter: ", filteredPosts());

  });

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
  };

  const getButtonClasses = (tag: string) => {
    const isActive = activeTag() === tag;
    return `tag-filter px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
      ? 'bg-blue-600 text-white'
      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
      }`;
  };

  return (
    <div>
      {/* Tags Filter */}
      <div class="mb-12">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Browse by Topic
        </h2>
        <div class="flex flex-wrap gap-2">
          <button
            class={getButtonClasses('all')}
            onClick={() => handleTagClick('all')}
          >
            All Posts
          </button>
          <For each={props.allTags}>
            {(tag) => (
              <button
                class={getButtonClasses(tag)}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Filtered Posts */}
      <section>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-8">
          All Articles
        </h2>

        {filteredPosts().length > 0 ? (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <For each={filteredPosts()}>
              {(post) => (
                <div class="post-item">
                  {/* You'll need to import and use your BlogCard component here */}
                  <BlogCard
                    post={post}
                  />
                </div>
              )}
            </For>
          </div>
        ) : (
          // Empty State
          <div class="text-center py-16">
            <svg
              class="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.01-6-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              Try selecting a different topic or browse all posts.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}


// <!-- Tags Filter -->
// <div class="mb-12">
//   <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
//     Browse by Topic
//   </h2>
//   <div class="flex flex-wrap gap-2">
//     <button
//       class="tag-filter active px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium transition-all duration-200"
//       data-tag="all"
//     >
//       All Posts
//     </button>
//     {
//       allTags.map((tag) => (
//         <button
//           class="tag-filter px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-sm font-medium transition-all duration-200"
//           data-tag={tag}
//         >
//           {tag}
//         </button>
//       ))
//     }
//   </div>
// </div>
//
// <!-- Featured Posts -->
// {
//   featuredPosts.length > 0 && (
//     <section class="mb-16">
//       <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
//         <svg
//           class="w-6 h-6 mr-2 text-yellow-500"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//         Featured Articles
//       </h2>
//       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {featuredPosts.map((post) => (
//           <BlogCard
//             title={post.data.title}
//             description={post.data.description}
//             publishedDate={post.data.publishedDate}
//             readingTime={calculateReadingTime(post.body!)}
//             slug={post.id}
//             tags={post.data.tags}
//             featured={true}
//           />
//         ))}
//       </div>
//     </section>
//   )
// }
//
// <!-- All Posts -->
// <section>
//   <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-8">
//     All Articles
//   </h2>
//   <div
//     id="posts-container"
//     class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//   >
//     {
//       regularPosts.map((post) => (
//         <div class="post-item" data-tags={JSON.stringify(post.data.tags)}>
//           <BlogCard
//             title={post.data.title}
//             description={post.data.description}
//             publishedDate={post.data.publishedDate}
//             readingTime={calculateReadingTime(post.body!)}
//             slug={post.id}
//             tags={post.data.tags}
//             featured={false}
//           />
//         </div>
//       ))
//     }
//   </div>
//
//   <!-- Empty State -->
//   <div id="empty-state" class="hidden text-center py-16">
//     <svg
//       class="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         stroke-width="2"
//         d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.01-6-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//       ></path>
//     </svg>
//     <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
//       No posts found
//     </h3>
//     <p class="text-slate-600 dark:text-slate-400">
//       Try selecting a different topic or browse all posts.
//     </p>
//   </div>
// </section>
