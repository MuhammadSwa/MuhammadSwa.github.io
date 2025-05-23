interface Tag {
  name: string;
  count: number;
}

interface TagsProps {
  tags: Tag[];
  selectedTag?: string;
}

export default function Tags(props: TagsProps) {
  const { tags, selectedTag } = props;

  return (
    <div class="flex flex-wrap gap-2">
      <a
        href="/blog"
        class={`px-3 py-1 rounded-full text-sm transition-colors ${
          !selectedTag
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </a>
      {tags.map((tag) => (
        <a
          href={`/blog/tags/${tag.name}`}
          class={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedTag === tag.name
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {tag.name}
          <span class="ml-1 text-xs opacity-75">({tag.count})</span>
        </a>
      ))}
    </div>
  );
} 