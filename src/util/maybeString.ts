type StringLike = string | { toString(): string };

export default function maybeString<A extends StringLike>(
  template: A,
) {
  return `${template}`;
}