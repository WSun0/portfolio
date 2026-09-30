# Editing and publishing the portfolio

## Open the existing repository in VS Code

Use **File → Open Folder…** and choose:

```text
/Users/wsun1/Documents/ChatGPT/Portfolio Website
```

This folder is already connected to `https://github.com/WSun0/portfolio.git`.
VS Code detects its Git repository automatically; do not initialize another repository or clone over this folder.

## Before editing

Open **Terminal → New Terminal** in VS Code:

```sh
git switch main
git pull --ff-only origin main
```

Check the branch in VS Code's lower-left corner. `main` is the production branch.
If Git reports uncommitted changes or a conflict, review them before switching or pulling.

## Files to edit

- `src/app/page.tsx`: homepage introduction
- `src/app/contact/page.tsx`: contact text
- `src/app/other/page.tsx`: Other introduction and descriptions
- `src/app/poker/page.tsx`: poker introduction
- `src/app/cooking/page.tsx`: cooking introduction
- `src/lib/filesystem.ts`: directory entries, order, and blog post list
- `src/components/NotebookShell.tsx`: directory and terminal behavior

Text is JSX. Keep the surrounding tags, and write `&amp;` for an ampersand in prose.

## Write a blog post

Posts are currently React `.tsx` pages, not Markdown files. The `.md` names in the sidebar are part of the filesystem-style presentation.

1. Create `src/app/blog/my-post/page.tsx`:

```tsx
export const metadata = { title: 'My Post · William Sun' };

export default function Post() {
  return <>
    <h1>my post</h1>
    <p>your first paragraph goes here.</p>
    <p>your next paragraph goes here.</p>
  </>;
}
```

2. Add an entry to the `blog` array near the top of `src/lib/filesystem.ts`:

```ts
{
  name: 'my-post.md',
  path: '/blog/my-post.md',
  href: '/blog/my-post',
  title: 'my post',
  date: '2026-09-30',
},
```

Use your actual publication date in `YYYY-MM-DD` format. The blog index sorts newest first, and the sidebar and terminal use this same entry.

3. When replacing the under-construction placeholder, update the content expectations in `test/integration/content.test.tsx`, `test/unit/lib/filesystem.test.ts`, and `test/http/routes.mjs`. They currently verify the placeholder's date and the exact published post list. Keep the archived-post checks intact.

## Preview locally

```sh
npm run dev
```

Visit the localhost address printed by Next.js, normally `http://localhost:3000`. If a dev server is already running, use that preview. Saving a file updates the preview; it does not publish the site.

## Publish directly to production

Review the changes, run the checks, then commit and push:

```sh
npm run test:all
git diff
git add src
git commit -m "Update portfolio content"
git push origin main
```

If you changed tests, stage those files as well before committing (`git add test`). Stage only the files you mean to publish.

You can also stage, commit, and push from VS Code's Source Control panel. A commit saves local Git history; a push uploads it to GitHub. Vercel automatically builds pushes to `main` and updates `https://wsun.one` after a successful deployment. You do not need to reconnect the domain or change DNS.

Direct pushes publish without waiting for GitHub Actions, so run the checks before pushing. Use a separate branch and pull request when you want deployment checks and a preview before production.
