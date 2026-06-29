type TagListProps = {
  ariaLabel: string;
  tags: string[];
};

export function TagList({ ariaLabel, tags }: TagListProps) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={ariaLabel}>
      {tags.map((tag) => (
        <li
          className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-text-muted"
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
